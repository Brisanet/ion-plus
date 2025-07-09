# BEM Naming Convention Guide

## Introduction

This is a style guide to create cleaner and more readable CSS classes.

[BEM](https://en.bem.info/methodology/) stands for Block, Element, and Modifier. It’s a CSS naming convention.

The core concept is name our classes based on the building blocks of the structure, its children elements and possible state modifiers.

You can see the regular structure of a class in the examples below:

### Block + Element

`block__element`

### Block + Modifier

`block--modifier`

### Block + Element + Modifier

`block__element--modifier`

## Block

Blocks are the independent, bigger parts. Which may have modifiers, elements and even other blocks.

## Elements

Elements are the children of a block, and they can only have 1 (one) parent. Their name is defined with the junction of the parent block name 2 (two) underscores and the element name.

## Modifier

Modifiers are variations of a block or element, they are represented in the class by 2 (two) dashes followed by the modifier name. They can represent an specific state, like if it's a ghost, a primary or a secondary button, or a property variation like size, color etc...

## Examples

- In a situation where we have a button with 2 color variations and sizes, the classes would look like this:

```css
.button--red {
  ...
};

.button--blue {
  ...
};

.button--sm {
  ...
}

.button--md {
  ...
}
```

- If we have a header with a logo, a search bar and a list with actions, the classes would look like this:

```html
<header class="header">
  <img class="header__logo" />
  <div class="header__search"></div>
  <ul class="header__list">
    <li class="header__item"></li>
    <li class="header__item"></li>
  </ul>
</header>
```

With SCSS we would have an css syntax like this:

```scss
.header {
  // rules
  &__logo {
    // rules
  }
  &__search {
    // rules
  }
  &__list {
    // rules
  }
  &__item {
    // rules
  }
}
```

- It is important to remember that an alement can't be inside another, what we can do in this situation is to treat this inner element as a "son" of the block, or use a 2 classes scheme:

```html
<ul class="list">
  <li class="list__item">
    <h2 class="list__title">My publication</h2>
  </li>
</ul>
```

or

```html
<ul class="list">
  <li class="list__item publication">
    <h2 class="publication__title">My publication</h2>
  </li>
</ul>
```

- It can occur a situation where you have a element that is part of a specific state of the block, in this case you just follow the same pattern, with a class for the modifier and one for the the conditional element itself:

```html
<button class="btn btn--loading">
  <div class="btn__spinner"></div>
</button>
```

## References

To a deep dive, with more explanation on the pattern, check:

- [Official Docs](https://en.bem.info/methodology/)
- [Article: Understanding CSS BEM](https://codeburst.io/understanding-css-bem-naming-convention-a8cca116d252)
- [Article: BEM em 5min](https://medium.com/trainingcenter/bem-em-5min-f5c80fd23439)
