import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
// import Image from "next/image";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "标题不能为空",
    })
    .max(30),
  sub_title: z.string().max(30),
  body_text: z.string().max(50),
  // prompt_text_zh: z.string().max(50),
  wh_ratios: z.string(),
});

const ImageSearch: React.FC = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      body_text: "",
      // prompt_text_zh: "提示词",
      wh_ratios: "竖版",
    },
  });
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    setImageUrl("");
    const response = await fetch(`/api/textToImage`, {
      method: "POST",
      body: JSON.stringify({
        input: {
          ...data,
          prompt_text_zh: "中文",
          lora_weight: 0.8,
          ctrl_ratio: 0.7,
          ctrl_step: 0.7,
          generate_mode: "generate",
        },
        model: "wanx-poster-generation-v1",
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const { result } = await response.json();
    setLoading(false);
    if (result?.output?.task_status === "SUCCEEDED") {
      setImageUrl(result?.output?.render_urls[0]);
    } else {
      toast("生成失败，请重试");
    }
  };

  return (
    <div className="flex flex-col p-10 h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">海报生成</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>标题</FormLabel>
                <FormControl>
                  <Input placeholder="标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sub_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>副标题</FormLabel>
                <FormControl>
                  <Input placeholder="副标题" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="body_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>正文</FormLabel>
                <FormControl>
                  <Input placeholder="正文" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="prompt_text_zh"
            render={({ field }) => (
              <FormItem>
                <FormLabel>中文提示词</FormLabel>
                <FormControl>
                  <Input placeholder="提示词" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="wh_ratios"
            render={({ field }) => (
              <FormItem>
                <FormLabel>选择板式</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="选择板式" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="竖版">竖版</SelectItem>
                    <SelectItem value="横版">横版</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit">
            {loading ? "生成中，请稍后..." : "提交生成"}
          </Button>
        </form>
      </Form>

      {imageUrl && (
        <>
          <div className="bg-white p-6 rounded-md shadow-md mb-8 relative">
            {/* <Image src={imageUrl} fill objectFit="cover" alt="" /> */}
            <img src={imageUrl} alt="" />
          </div>
          <a
            href={imageUrl}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mt-4 flex justify-center w-20"
          >
            下载
          </a>
        </>
      )}
    </div>
  );
};

export default ImageSearch;
