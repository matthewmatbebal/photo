// next.config.ts
import type { NextConfig } from "next";
import type { RuleSetRule } from "webpack"

/** Тайпгард: является ли правило RuleSetRule с полем test */
function isRuleSetRule(value: unknown): value is RuleSetRule {
  return typeof value === "object" && value !== null && "test" in value;
}

const nextConfig: NextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(
      (rule: unknown): rule is RuleSetRule =>
        isRuleSetRule(rule) &&
        rule.test instanceof RegExp &&
        rule.test.test(".svg"),
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
