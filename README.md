# mokuroku2geojson

[gsi-cyberjapan/mokuroku-spec](https://github.com/gsi-cyberjapan/mokuroku-spec) の CSV ファイルからポリゴンを作成します。  
1タイル=1ポリゴンで生成されます。目録そのもののデータが大きいため、適度に分割または抽出して実行してください。

Out of Memory が発生する場合には `node` の実行オプションとして `--max-old-space-size=` を追加すると処理できるようになるかもしれません。

```
$ node src/index.js mokuroku.csv
```

----
MIT License