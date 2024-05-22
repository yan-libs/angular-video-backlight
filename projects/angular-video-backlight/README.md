# angular-video-backlight
Turn on beautiful backlight for video like youtube

## Installation
#### NPM
```
npm install angular-video-backlight
```

#### Import the module
```ts
import { VideoBacklightModule } from "angular-video-backlight";

@NgModule({
  declarations: [
   //some declarations
  ],
  imports: [
    //some imports
    VideoBacklightModule
  ],
})
```

On a HTML video tag put the `backlight` directive
```html
<video backlight>...</video>
```

## Parameters
| Name               | Type             | Description                                                                                |
|:-------------------|:-----------------|:-------------------------------------------------------------------------------------------|
| delta              | number           | offset-x or offset-y(depending on the side)                                                |
| blur_radius        | number           | The larger this value, the bigger the blur, so the shadow becomes bigger and lighter.      |
| spread_radius      | number           | The larger this value, the bigger the shadow.                                              |
| alpha              | number           | The lower this value, the more transparent the shadow                                      |


## Demo
You can try out a demo by [clicking here](https://yan-libs.github.io/angular-video-backlight/).

## Source
https://github.com/yan-libs/angular-video-backlight/tree/develop/projects/angular-video-backlight
