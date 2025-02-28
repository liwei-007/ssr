import {
  EventSourceMessage,
  fetchEventSource,
} from "@microsoft/fetch-event-source";

// 定义 SSE 请求的配置选项
export interface SseOptions {
  url: string;
  method?: "GET" | "POST";
  params?: Record<string, string | number | object>;
  headers?: Record<string, string>;
  onMessage: (event: EventSourceMessage) => void;
  onError?: (error: Error) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

// 封装 SSE 客户端类
export class SseClient {
  private controller: AbortController | null = null;
  private options: SseOptions;

  constructor(options: SseOptions) {
    this.options = {
      method: "GET",
      ...options,
    };
    this.connect();
  }

  // 建立 SSE 连接
  private connect() {
    const {
      url,
      method,
      params,
      headers = {},
      onMessage,
      onError,
      onOpen,
      onClose,
    } = this.options;

    let fullUrl = url;
    let body: string | undefined;

    if (method === "GET") {
      // 处理 GET 请求参数
      const queryString = params
        ? Object.entries(params)
            .map(
              ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(
                  String(value)
                )}`
            )
            .join("&")
        : "";
      fullUrl = queryString ? `${url}?${queryString}` : url;
    } else if (method === "POST") {
      // 处理 POST 请求参数
      body = JSON.stringify(params);
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
    }

    // 创建 AbortController 用于取消请求
    this.controller = new AbortController();
    const signal = this.controller.signal;

    // 发起 SSE 请求
    fetchEventSource(fullUrl, {
      method,
      headers: {
        ...headers,
      },
      body,
      signal,
      onopen: (): any => {
        if (onOpen) {
          onOpen();
        }
      },
      onmessage: onMessage,
      onerror: (error) => {
        if (this.controller?.signal.aborted) {
          return;
        }
        if (onError) {
          onError(error);
        }
        this.disconnect();
        // 重新抛出错误，fetchEventSource 会根据重试策略处理
        throw error;
      },
      onclose: () => {
        this.disconnect();
        if (onClose) {
          onClose();
        }
      },
    });
  }

  // 断开 SSE 连接
  public disconnect() {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }
}
