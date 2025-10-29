import { unified } from 'unified';
import * as remarkParseModule from 'remark-parse';
import { visit } from 'unist-util-visit';

const remarkParse = remarkParseModule.default;

/**
 * Parse CHANGELOG.md into structured JSON
 */
export function markdownParser(markdownContent) {
    if (!markdownContent) return [];

    const tree = unified().use(remarkParse).parse(markdownContent);
    let changelogData = [];
    let currentRelease = null;
    let currentCategory = null;

    
    const extractText = (children) => {
        let result = '';
        
        visit({ type: 'root', children }, 'text', (n) => {
            result += n.value;
        });
        return result.trim();
    };

    const extractChangeItemData = (listItemNode) => {
        let description = '';
        let commitLink = 'N/A';

        visit(listItemNode, (node) => {
            if (node.type === 'link') {
                commitLink = node.url.split('/').pop();
                return 'skip';
            }
            if (node.type === 'text') {
                description += node.value;
            }
        });

        const cleanDescription = description.split('(')[0].trim().replace(/^- /, '');
        return {
            description: cleanDescription,
            commitLink: commitLink === 'N/A' ? 'N/A' : commitLink.substring(0, 7),
        };
    };

    visit(tree, ['heading', 'listItem'], (node) => {
        if (node.type !== 'heading') {
            if (node.type === 'listItem' && currentRelease && currentCategory) {
                const changeItem = extractChangeItemData(node);
                currentRelease.categories[currentCategory].push(changeItem);
            }
            return;
        }

        const rawText = extractText(node.children);
        const depth = node.depth;
        const hasLink = node.children.some((child) => child.type === 'link');
        const hasDate = rawText.match(/\(\d{4}-\d{2}-\d{2}\)/);
        
        const versionPattern = /^v?\d+\.\d+\.\d+/;
        const firstToken = rawText.split(/[\s(]/)[0].replace(/[[\]]/g, '');
        const hasVersionNumber = versionPattern.test(firstToken);

        const isReleaseHeading = (depth === 2 || depth === 3) && hasVersionNumber && (hasLink || hasDate);

        if (isReleaseHeading) {
            if (currentRelease) changelogData.push(currentRelease);

            const linkNode = node.children.find((child) => child.type === 'link');
            const dateMatch = rawText.match(/\(\d{4}-\d{2}-\d{2}\)/);

            let version = 'N/A';
            let compareLink = '#';

            if (linkNode) {
                version = extractText(linkNode.children).replace(/[[\]]/g, '').trim();
                compareLink = linkNode.url;
            } else {
                version = rawText.split('(')[0].trim();
            }

            currentRelease = {
                version: version,
                compareLink: compareLink,
                date: dateMatch ? dateMatch[0].replace(/[()]/g, '') : 'N/A',
                categories: {},
            };
            currentCategory = null;
        } else if (currentRelease && depth >= 3) {
            currentCategory = rawText.trim();
            if (!currentRelease.categories[currentCategory]) {
                currentRelease.categories[currentCategory] = [];
            }
        }
    });

    if (currentRelease) changelogData.push(currentRelease);
    
    return changelogData.filter(data => 
        data.version.match(/^v?\d+\.\d+\.\d+$/) 
    );
}