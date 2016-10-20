# easy-git-npm-tools
这是一个个人的工具配置工具，用来缩短git命令、以及配置npm/yarn的中国区使用。

这工具本身做的事情很简单，你也可以参考其中的配置项自己设置。

# 使用方式

- `npm install easy-git-npm-tools -g`
- `easy-git-npm-tools`

设置的配置项j结果如下：

```
bash$ easy-git-npm-tools

# 配置 git: #
  已设置Git短命令: co = checkout
  已设置Git短命令: ca = commit -a
  已设置Git短命令: cm = commit -m
  已设置Git短命令: a = add -A
  已设置Git短命令: st = status
  已设置Git短命令: br = branch
  已设置Git短命令: p = pull --ff-only
# 配置 npm: #
  已设置npm变量: registry=https://registry.npm.taobao.org
  # WARN: # 请注意更改了 npm "registry" 之后,  "npm publish" 将会失败.
           (手动设回: --registry https://registry.npmjs.org )
  已设置npm变量: disturl=https://npm.taobao.org/dist
  已设置环境变量: SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass
  已设置环境变量: ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/
# 配置 yarn: #
  已设置yarn变量: registry=https://registry.npm.taobao.org
  已设置yarn变量: disturl=https://npm.taobao.org/dist
```

环境变量部分使用 `os-env-setter` 可在多个系统下生效。
