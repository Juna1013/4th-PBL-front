import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'src/content');

export function getMarkdownContent(filename: string) {
    const fullPath = path.join(contentDirectory, `${filename}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        meta: data as { title: string; date: string; description: string },
        content,
    };
}
