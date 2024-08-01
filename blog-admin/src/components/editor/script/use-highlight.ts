// 引入 hljs
import hljs from 'highlight.js/lib/core'
// 引入语言
import bash from 'highlight.js/lib/languages/bash'
import sql from 'highlight.js/lib/languages/sql'
import json from 'highlight.js/lib/languages/json'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import java from 'highlight.js/lib/languages/java'
import python from 'highlight.js/lib/languages/python'
// 引入主题
import 'highlight.js/styles/base16/material-palenight.css'

// 注册语言
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('python', python)
hljs.registerLanguage('java', java)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('sql', sql)

export default hljs
