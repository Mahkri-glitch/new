#!/usr/bin/env bun

import yaml from "js-yaml"
import { readFileSync } from "fs"
import { fileURLToPath } from "url"
import { dirname, join, basename } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, "..")

function checkYamlFile(filePath: string): void {
  try {
    const content = readFileSync(filePath, "utf-8")
    const lines = content.split("\n")
    const errors: string[] = []
    const warnings: string[] = []

    lines.forEach((line, index) => {
      const lineNumber = index + 1

      // Check for trailing whitespace
      if (/(\s+$)/.test(line)) {
        warnings.push(`  Line ${lineNumber}: Trailing whitespace`)
      }

      // Check for tabs in YAML (not recommended)
      if (/\t/.test(line)) {
        errors.push(`  Line ${lineNumber}: Tabs not allowed in YAML, use spaces`)
      }

      // Check for proper indentation
      const trimmed = line.trimStart()
      if (trimmed && !line.match(/^\s*-\s|\s*$/)) {
        const indent = line.length - line.indexOf(trimmed)
        if (indent % 2 !== 0) {
          errors.push(`  Line ${lineNumber}: YAML requires even indentation (${indent} spaces)`)
        }
      }

      // Check for problematic patterns
      if (/\[.*\]/.test(line) && !line.startsWith("#")) {
        const match = line.match(/\[([^\]]+)\]/)
        if (match) {
          warnings.push(`  Line ${lineNumber}: Inline array syntax may be problematic: ${match[0]}`)
        }
      }
    })

    if (errors.length > 0) {
      console.error(`❌ Errors in ${filePath}:`)
      errors.forEach(err => console.error(err))
    }

    if (warnings.length > 0) {
      console.warn(`⚠️  Warnings in ${filePath}:`)
      warnings.forEach(warn => console.warn(warn))
    }

    console.log(`✅ ${filePath} validated`)
  } catch (error) {
    if ((error as Error).message.includes("YAML")) {
      console.error(`❌ ${filePath}: ${error}`)
    } else {
      console.warn(`⚠️  Skipping ${filePath}: ${error}`)
    }
  }
}

function main(): void {
  console.log("🔍 Checking YAML files in project...\n")

  const files: string[] = []
  const ignoredDirs = ["node_modules", ".next", "dist", ".git"]

  function collectFiles(dir: string): void {
    try {
      const entries = Bun.readdir(dir, { encoding: "utf-8", recursive: false })
      for (const entry of entries) {
        const path = join(dir, entry.name)
        const stat = Bun.stat(path)

        if (stat.isDirectory && !ignoredDirs.includes(entry.name)) {
          collectFiles(path)
        } else if (stat.isFile && entry.name.match(/\.(yml|yaml)$/)) {
          // Skip node_modules YAML files
          if (!path.includes("node_modules")) {
            files.push(path)
          }
        }
      }
    } catch (err) {
      // Skip if directory can't be read
    }
  }

  collectFiles(projectRoot)

  if (files.length === 0) {
    console.log("ℹ️  No YAML files found in project (outside node_modules)")
    return
  }

  console.log(`Found ${files.length} YAML file(s):\n`)

  for (const file of files) {
    console.log(`\n--- Checking: ${file} ---`)
    checkYamlFile(file)
  }

  console.log("\n" + "=".repeat(50))
  console.log("✅ YAML check completed!")
}

main()
