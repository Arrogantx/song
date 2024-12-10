"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";
import { useState } from "react";

export function ContentOutput({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Generated Content</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap bg-background p-6 rounded-md border">
          {content}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}