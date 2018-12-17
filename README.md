# DllPlugin и optimization.splitChunks (SplitChunksPlugin)
Оба плагина используются для разбиения кода на несколько бандлов, однако, у них есть некоторые особенности, и они позволяют решать разные задачи.    
`optimization.splitChunks (SplitChunksPlugin)` подходит в тех случаях, когда нам просто необходимо разбить код на несколько багдлов.    
`DllPlugin` подходит, когда на критично время сборки и когда используемые бандлы могут множественно переиспользоваться в нескольких других пакетах.    

## [optimization.splitChunks](https://webpack.js.org/configuration/optimization/#optimization-minimizer) ([SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/))
В рамках конфигурации (либо плагин может работать в автоматическом режиме без дополнительных конфигураций) весь код можно разделить на несколько файлов, например, `vendors`, `polyfills`, `elements`, `utils` и т.п, а выделить в отдельный файл общий для всех модулей код. Webpack разделяет код по файлам и собирает этот код каждый раз, когда запускается сборка.

```bash
npm run build:without-dll
```

## [DllPlugin](https://webpack.js.org/plugins/dll-plugin/)
Во время конфигурирования необходимо продумать сборки как для библиотек (dll), так и для пакетов, которые их будут использовать. Мы можем собрать пакеты `vendors`, `polyfills`, `elements`, `utils` различными способами и разместить их, например, в npm в различные подпакеты, после чего подключать их в нашу сборку, причем при запуске сборки webpack будет связывать обращение к какой-то библиотеке, например, из `vendors` с уже собранным dll. Таким образом мы можем разбить наше приложение на несколько модулей и собирать их отдельно, не тратя время на пересборку этих пакетов.

**Абстрактный пример**:    
Есть бандл `vendors`, где собраны все внешние библиотеки.    
Есть бандлы `elements` и `utils`, где хранятся какие-то ui-элементы и набор общих утилит соответственно, причем в коде этих бандлов подключаются внешние библиотеки.    
Описанные выше бандлы меняются редко, а часто меняются бандлы конкретных страниц сайта, где используются утилиты, ui-элементы и внешние библиотеки. Мы подключаем уже собираем и подключаем бандлы `vendors`, `elements`, `utils` с помощью DllPlugin, таким образом мы уменьшаем время сборки, т.к. большая часть модулей уже собрана.    
Причем, если где-то в коде `elements` и `utils` подключается внешняя библиотека, то подключена она будет из `vendors`.

```bash
npm run build:with-dll # full build

npm run build:vendors-dll # build only vendors dll
npm run build:dll-references # build our code
```
