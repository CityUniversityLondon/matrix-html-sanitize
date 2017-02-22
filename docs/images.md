# Images markup

All images must conform to:

```html
<figure>
    <img src="./?a=ASSET_ID"
         alt="%globals_asset_attribute_alt:ASSET_ID%"/>
    <figcaption>caption</figcaption>
</figure>
```

`<figcaption>` is optional.

Lazy loading images must conform to:

```html
<figure>
    <img class="lazy-load" 
         data-src="./?a=ASSET_ID" 
         src="/__data/assets/git_bridge/0015/344112/main/img/blank.png"
         alt="%globals_asset_attribute_alt:ASSET_ID%"
    <noscript>
         style="padding-bottom:%globals_asset_attribute_height:ASSET_ID^replace_keywords:divide:{globals_asset_attribute_width:ASSET_ID}^multiply:100%%"/>         
        <img src="./?a=ASSET_ID"
             alt="%globals_asset_attribute_alt:ASSET_ID%"/>
    </noscript>
    <figcaption>caption</figcaption>
</figure>
```

`<figcaption>` is optional.

For non-lazy-load images, sanitize will ensure:

- `<img>` is wrapped inside a `<figure>`. Will create a `<figure>` if necessary.
- `<figure>` contains only a `<img>` and optionally an `<figcaption>`. Will delete any other content.
- If the `img` has no `alt` attribute, but `src` matches format `./?a=ASSET_ID`, it'll add `alt="%globals_asset_attribute_alt:ASSET_ID%"`.


For lazy-load images:

- `<img>` is wrapped inside a `<figure>`. Will create a `<figure>` if necessary.
- `<img>` has a `data-src` attribute with a URL value. Unless `src` is empty or has the blank image url, `data-src` will be
always updated with the `src` value.
- `<img>` has a `src` attribute with a blank image fixed value.
- `<img>` has a `style` attribute including a padding-bottom. Any other style will be removed. If `data-src` matches
`./?a=ASSET_ID`, the bottom padding will use the asset id as above.
- `<figure>` has a `<noscript>` tag with the content indicated above.
- `<figure>` contains only a `<img>`, a `<noscript>`, and optionally an `<figcaption>`. Will delete any other content.
- If `data-src` matches `./?a=ASSET_ID`, both `img` tags have `alt` attribute set to `%globals_asset_attribute_alt:ASSET_ID%`.
