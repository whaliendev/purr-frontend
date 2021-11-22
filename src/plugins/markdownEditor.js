import VueMarkdownEditor from '@kangc/v-md-editor';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import hljs from 'highlight.js';
import createEmojiPlugin from '@kangc/v-md-editor/lib/plugins/emoji/index';
import createKatexPlugin from '@kangc/v-md-editor/lib/plugins/katex/cdn';
import createMermaidPlugin from '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import createTipPlugin from '@kangc/v-md-editor/lib/plugins/tip/index';

VueMarkdownEditor.use(githubTheme, {
  Hljs: hljs,
  extend(md) {
    // TODO: extend plugins for markdown it instance
    console.log(md);
  }
});

VueMarkdownEditor.use(createTipPlugin());
VueMarkdownEditor.use(createEmojiPlugin());
VueMarkdownEditor.use(createKatexPlugin());
VueMarkdownEditor.use(createTodoListPlugin());
VueMarkdownEditor.use(createMermaidPlugin());
VueMarkdownEditor.use(createCopyCodePlugin());

export default VueMarkdownEditor;
