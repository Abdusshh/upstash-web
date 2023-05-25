"use client";

import { useState } from "react";
import ExampleFilter from "./filter";
import { Example as Box } from "./comp";
import { allExamples, Example } from "contentlayer/generated";

export default function HomePage() {
  const [selectedProducts, setSelectedProduct] = useState<string[]>([]);
  const [selectedUseCase, setSelectedUseCase] = useState<string[]>([]);
  const [selectedStacks, setSelectedStack] = useState<string[]>([]);

  const data = allExamples.filter((item: Example) => {
    // if (product.length && !product.includes(item.products)) return false;
    // if (useCase.length && !useCase.includes(item.use_case)) return false;
    // if (stack.length && !stack.some((s) => item.stack.includes(s))) return false;
    return true;
  });

  return (
    <div className="flex flex-col items-start gap-16 text-left lg:flex-row">
      <div className="lg:w-1/6">
        <ExampleFilter
          selectedProducts={selectedProducts}
          setSelectedProduct={setSelectedProduct}
          selectedUseCase={selectedUseCase}
          setSelectedUseCase={setSelectedUseCase}
          selectedStacks={selectedStacks}
          setSelectedStack={setSelectedStack}
        />
      </div>

      <div className="grid grow gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {data.map((item) => (
          <Box key={item.title} products={item.products}>
            <Box.Products />
            <Box.Title>{item.title}</Box.Title>
            <Box.Link>
              <Box.LinkItem href={item.github_url}>Code</Box.LinkItem>
              <Box.LinkItem href={item.blog_url}>Read</Box.LinkItem>
            </Box.Link>
          </Box>
        ))}
      </div>
    </div>
  );
}
