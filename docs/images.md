# Images markup

## All images must conform to:

```html
<figure>
    <img src="./?a=ASSET_ID"
         alt="%globals_asset_attribute_alt:ASSET_ID%">
    <figcaption>caption</figcaption>
</figure>
```

`<figcaption>` is optional.

## Lazy loading images must conform to:

```html
<figure>
    <img class="lazy-load" 
         data-src="./?a=ASSET_ID" 
         src="/__data/assets/git_bridge/0015/344112/main/img/blank.png"
         alt="%globals_asset_attribute_alt:ASSET_ID%">
    <noscript style="padding-bottom:%globals_asset_attribute_height:ASSET_ID^replace_keywords:divide:{globals_asset_attribute_width:ASSET_ID}^multiply:100%%">         
        <img src="./?a=ASSET_ID"
             alt="%globals_asset_attribute_alt:ASSET_ID%">
    </noscript>
    <figcaption>caption</figcaption>
</figure>
```

`<figcaption>` is optional.

## With Image Credit:

```html
<figure>
    <div>
        <img src="./?a=ASSET_ID"
             alt="%globals_asset_attribute_alt:ASSET_ID%">
        %begin_has_imageCredit%
            <div class="image-credit">
                <button role="button" class="image-credit__button" aria-pressed="false" aria-title="Show Image Credit" title="Show Image Credit">
                    <span class="fa  fa-info" aria-hidden="true"></span>
                </button>
                <div class="image-credit__text">
                    %begin_has_imageCreditAuthor%
                        <div>
                            %globals_asset_metadata_credit.authorURL^neq::<a href="%%globals_asset_metadata_credit.authorURL%%globals_asset_metadata_credit.authorURL^neq::" title="%%globals_asset_metadata_credit.authorURL^replace_keywords:neq::{asset_metadata_credit.authorName}%%globals_asset_metadata_credit.authorURL^neq::">%
                            %globals_asset_metadata_credit.authorName%
                            %globals_asset_metadata_credit.authorURL^neq::</a>%
                        </div>
                    %end_has_imageCreditAuthor%
                    %begin_has_imageCreditSource%
                        <div>
                            %globals_asset_metadata_credit.sourceURL^neq::<a href="%%globals_asset_metadata_credit.sourceURL%%globals_asset_metadata_credit.sourceURL^neq::" title="%%globals_asset_metadata_credit.sourceURL^replace_keywords:neq::{asset_metadata_credit.sourceName}%%globals_asset_metadata_credit.sourceURL^neq::">%
                            %globals_asset_metadata_credit.sourceName%
                            %globals_asset_metadata_credit.sourceURL^neq::</a>%
                        </div>
                    %end_has_imageCreditSource%
                    %begin_has_imageCreditLicense%
                        <div>
                            %globals_asset_metadata_credit.licenseURL^neq::<a href="%%globals_asset_metadata_credit.licenseURL%%globals_asset_metadata_credit.licenseURL^neq::" title="%%globals_asset_metadata_credit.licenseURL^replace_keywords:neq::{asset_metadata_credit.licenseType}%%globals_asset_metadata_credit.licenseURL^neq::">%
                            %globals_asset_metadata_credit.licenseType%
                            %globals_asset_metadata_credit.licenseURL^neq::</a>%
                        </div>
                    %end_has_imageCreditLicense%
                </div>
            </div>
        %end_has_imageCredit%
    </div>
    <figcaption>caption</figcaption>
</figure>
```

`<figcaption>` is optional.

### For non-lazy-load images, sanitize will ensure:

- `<img>` is wrapped inside a `<figure>`. Will create a `<figure>` if necessary.
- `<figure>` contains only a `<img>` and optionally an `<figcaption>`. Will delete any other content.
- If the `img` has no `alt` attribute, but `src` matches format `./?a=ASSET_ID`, it'll add `alt="%globals_asset_attribute_alt:ASSET_ID%"`.


### For lazy-load images:

- `<img>` is wrapped inside a `<figure>`. Will create a `<figure>` if necessary.
- `<img>` has a `data-src` attribute with a URL value. Unless `src` is empty or has the blank image url, `data-src` will be
always updated with the `src` value.
- `<img>` has a `src` attribute with a blank image fixed value.
- `<img>` has a `style` attribute including a padding-bottom. Any other style will be removed. If `data-src` matches
`./?a=ASSET_ID`, the bottom padding will use the asset id as above.
- `<figure>` has a `<noscript>` tag with the content indicated above.
- `<figure>` contains only a `<img>`, a `<noscript>`, and optionally an `<figcaption>`. Will delete any other content.
- If `data-src` matches `./?a=ASSET_ID`, both `img` tags have `alt` attribute set to `%globals_asset_attribute_alt:ASSET_ID%`.
