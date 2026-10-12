---
title: Page Styling
sidebarHeader: Docs Development
sidebarSubHeader:
pageHeader: Docs Development
path: /guides/page-styling.html
outline: deep
tags:
---

<PageHeader/>

<SearchHighlight/>

# {{$frontmatter.title}}

You can add a style definition just for a single page. Be careful not to use class names used by VitePress. Prefixing `api3` to all class names is a best practice to protect VitePress classes.

<div class="api3-this-smaller-font">this-smaller-font</div>
<br/>
<button class="api3-this-pink-button">Pink Button</button>
<br/><br/>

```css
<!-- styles for this page only -->
<style>
.api3-this-smaller-font{
    font-size:x-small;
}
.api3-this-pink-button{
    border:#AA336A 1px solid;
    padding:5px 8px 5px 8px;
    border-radius:.3em;
    background-color:#AA336A;
    color:white;
    font-size:larger;
}
</style>
```

<!-- styles for this page only -->
<style>
.api3-this-smaller-font{
    font-size:x-small;
}
.api3-this-pink-button{
    border:#AA336A 1px solid;
    padding:5px 8px 5px 8px;
    border-radius:.3em;
    background-color:#AA336A;
    color:white;
    font-size:larger;
}
</style>
