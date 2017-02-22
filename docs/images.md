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
         src="some blank image"
         alt="%globals_asset_attribute_alt:ASSET_ID%"
         style="padding-bottom: %globals_asset_attribute_height:ASSET_ID^replace_keywords:divide:{globals_asset_attribute_width:ASSET_ID}^multiply:100%%"/>
    <noscript>
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
- `<img>` has a data-src attribute with a value in the format `./?a=ASSET_ID`. If not present, it'll try to use
`src` for this purpose. If neither have the correct format, it'll remove the `lazy-load` classname, and will treat the 
image as described above.
- `<img>` has a `style` attribute with the format above. Any other style will be removed.
- `<img>` has a `src` attribute with a fixed value (TBD). Will set this value.
- `<figure>` has a `<noscript>` tag with the content indicated above.
- `<figure>` contains only a `<img>`, a `<noscript>`, and optionally an `<figcaption>`. Will delete any other content.
- Both `img` tags have `alt` attribute, with value `%globals_asset_attribute_alt:ASSET_ID%`.


