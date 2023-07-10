# wdfx

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build

打包完后在index.html文件里的 body元素的最后一行加入（必须是最后一行，不然不能在最后执行）(https://blog.csdn.net/JSLang333/article/details/129142472)
	<script>
      (function (win) {
        // 获取页面所有的 <script > 标签对象
        let scripts = document.getElementsByTagName('script')
        // 遍历标签
        for(let i = 0; i < scripts.length; i++) {
          // 提取单个<script > 标签对象
          let script = scripts[i]
          // 获取标签中的 src
          let url = script.getAttribute("src")
          // 获取标签中的 type
          let type = script.getAttribute("type")
          // 获取标签中的js代码
          let scriptText = script.innerHTML
          // 如果有引用地址或者 type 属性 为 "module" 则代表该标签需要更改
          if (url || type === "module") {
            // 创建一个新的标签对象
            let tag=document.createElement('script');
            // 设置src的引入
            tag.setAttribute('url',url);
            // 设置js代码
            tag.innerHTML = scriptText
            // 删除原先的标签
            script.remove()
            // 将标签添加到代码中
            document.getElementsByTagName('head')[0].appendChild(tag)
          }
        }
      })(window)
    </script>
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
