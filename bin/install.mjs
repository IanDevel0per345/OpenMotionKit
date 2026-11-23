#!/usr/bin/env node
// OpenMotionKit installer: copies skills/openmotionkit/SKILL.md into the
// Claude Code skills folder (global by default, or ./.claude/skills with --project).
// Run with: npx openmotionkit  (or: npx openmotionkit --project)
import { cpSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SKILL = "openmotionkit";
const args = new Set(process.argv.slice(2));

if (args.has("--help") || args.has("-h")) {
  console.log(
    "Usage: npx openmotionkit [--project]\n\n" +
      "  (no flags)  install to ~/.claude/skills/openmotionkit\n" +
      "  --project   install to ./.claude/skills/openmotionkit (this project)\n" +
      "  --help      show this help",
  );
  process.exit(0);
}

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "..", "skills", SKILL, "SKILL.md");
if (!existsSync(src)) {
  console.error(`error: SKILL.md not found at ${src}`);
  process.exit(1);
}
const text = readFileSync(src, "utf8");
if (!text.includes("name: openmotionkit")) {
  console.error("error: SKILL.md does not look like the OpenMotionKit skill (missing frontmatter).");
  process.exit(1);
}

const destDir = args.has("--project")
  ? resolve(process.cwd(), ".claude", "skills", SKILL)
  : join(homedir(), ".claude", "skills", SKILL);
mkdirSync(destDir, { recursive: true });
const dest = join(destDir, "SKILL.md");
cpSync(src, dest);
const kb = (statSync(dest).size / 1024).toFixed(0);
console.log(`OpenMotionKit skill installed (${kb} KB) -> ${dest}`);
console.log('Now ask your agent: "create a motion for brand X, 9:16, in English."');
