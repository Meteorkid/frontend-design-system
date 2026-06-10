import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";

export default function ComponentsPage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight mb-2">组件库</h1>
        <p className="text-muted-foreground">
          基于 shadcn-ui 的 React 组件，使用设计系统 token 驱动样式。
        </p>
      </section>

      {/* Button */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Button</h2>
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <Separator />

      {/* Badge */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Badge</h2>
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>

      <Separator />

      {/* Input */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Input</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
          <Input placeholder="默认输入框" />
          <Input placeholder="禁用状态" disabled />
          <Input type="email" placeholder="邮箱类型" />
          <Input type="password" placeholder="密码类型" />
        </div>
      </section>

      <Separator />

      {/* Textarea */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Textarea</h2>
        <div className="max-w-xl">
          <Textarea placeholder="请输入多行文本..." />
        </div>
      </section>

      <Separator />

      {/* Select */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Select</h2>
        <div className="max-w-xs">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="选择一个选项" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      <Separator />

      {/* Checkbox */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Checkbox</h2>
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm">接受条款和条件</label>
        </div>
      </section>

      <Separator />

      {/* Alert */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Alert</h2>
        <div className="max-w-xl space-y-3">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>提示</AlertTitle>
            <AlertDescription>这是一个默认提示信息。</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <Info className="h-4 w-4" />
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>这是一个错误提示信息。</AlertDescription>
          </Alert>
        </div>
      </section>

      <Separator />

      {/* Tooltip */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Tooltip</h2>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">悬停查看提示</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>这是一个工具提示</p>
          </TooltipContent>
        </Tooltip>
      </section>

      <Separator />

      {/* Dialog */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Dialog</h2>
        <Dialog>
          <DialogTrigger>
            <Button variant="outline">打开对话框</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>确认操作</DialogTitle>
              <DialogDescription>
                这是一个对话框示例。点击关闭或按 ESC 退出。
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3">
              <Button variant="outline">取消</Button>
              <Button>确认</Button>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      <Separator />

      {/* Card */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Card</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>卡片标题</CardTitle>
              <CardDescription>卡片描述文字</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">卡片内容区域</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>数据展示</CardTitle>
              <CardDescription>用于展示统计数据</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">较上周 +12%</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>操作卡片</CardTitle>
              <CardDescription>包含操作按钮</CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="w-full">查看详情</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Separator */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Separator</h2>
        <p className="text-sm text-muted-foreground mb-4">上方和下方的分割线已在本页各处使用。</p>
      </section>
    </div>
  );
}
