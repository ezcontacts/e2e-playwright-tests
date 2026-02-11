import fs from 'fs';
import path from 'path';
import { TOKENS, type TokenValues } from '../constant/tokens.js';

const SOURCE_DIR = path.resolve(process.cwd(), 'test/features-for-generation');
const TARGET_DIR = path.resolve(process.cwd(), 'test/features/.generation');

function ensureEmptyDir(dir: string) {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function normalizeFileName(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
}

// Generation
function extractTokens(template: string): string[] {
  const regex = /{{(.*?)}}/g;
  const tokens = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = regex.exec(template))) {
    tokens.add(match[1]);
  }
  return Array.from(tokens);
}

function generateCombinations(
  tokens: string[],
  tokenValues: TokenValues
): Record<string, string>[] {
  if (tokens.length === 0) return [{}];

  const [first, ...rest] = tokens;
  const restCombos = generateCombinations(rest, tokenValues);

  const combos: Record<string, string>[] = [];

  const values = tokenValues[first] || [''];
  for (const val of values) {
    for (const combo of restCombos) {
      combos.push({ [first]: val, ...combo });
    }
  }

  return combos;
}

// Set tokens
function applyTokens(template: string, combo: Record<string, string>) {
  let result = template;
  for (const [token, value] of Object.entries(combo)) {
    result = result.replaceAll(`{{${token}}}`, value);
  }
  return result;
}

function processDirectory(srcDir: string, destDir: string) {
  if (!fs.existsSync(srcDir)) throw new Error(`Source dir not found: ${srcDir}`);

  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      processDirectory(srcPath, destPath);
      continue;
    }

    if (!entry.name.endsWith('.feature')) {
      fs.copyFileSync(srcPath, destPath);
      continue;
    }

    const template = fs.readFileSync(srcPath, 'utf8');

    const fileTokens = extractTokens(template);

    if (fileTokens.length === 0) {
      fs.writeFileSync(destPath, template, 'utf8');
      continue;
    }

    const combinations = generateCombinations(fileTokens, TOKENS);

    for (const combo of combinations) {
      const content = applyTokens(template, combo);

      const fileName =
        entry.name.replace(
          '.feature',
          `.${Object.values(combo).map(normalizeFileName).join('.')}.feature`
        );

      fs.writeFileSync(path.join(destDir, fileName), content, 'utf8');
    }
  }
}

// ------------------ RUN ------------------
console.log('Generating feature files...');
ensureEmptyDir(TARGET_DIR);
processDirectory(SOURCE_DIR, TARGET_DIR);
console.log('Feature generation completed');
