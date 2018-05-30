/**
 * Pattern module.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { BaseObject } from "../../Base";
import { getSystem } from "../../System";
import { List, ListDisposer } from "../../utils/List";
import { Animation, AnimationDisposer } from "../../utils/Animation";
import { registry } from "../../Registry";
import { InterfaceColorSet } from "../../utils/InterfaceColorSet";
import * as $iter from "../../utils/Iterator";
import * as $object from "../../utils/Object";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Base class to define patterns.
 */
var Pattern = /** @class */ (function (_super) {
    __extends(Pattern, _super);
    //public propertyValues = new Dictionary<PatternProperties, any>();
    /**
     * Constructor
     */
    function Pattern() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * List of elements the pattern consists of.
         *
         * @type {List<AMElement>}
         */
        _this._elements = new List();
        /**
         * A storage for Filter property/value pairs.
         *
         * @ignore Exclude from docs
         * @see {@link PatternProperties}
         * @type {PatternProperties}
         */
        _this.properties = {};
        _this.className = "Pattern";
        // Set defaults
        _this.width = 10;
        _this.height = 10;
        _this.x = 0;
        _this.y = 0;
        _this.patternUnits = "userSpaceOnUse";
        var interfaceColors = new InterfaceColorSet();
        _this.backgroundFill = interfaceColors.getFor("background");
        _this.backgroundOpacity = 0;
        _this.fillOpacity = 1;
        _this.fill = interfaceColors.getFor("alternativeBackground");
        _this.stroke = interfaceColors.getFor("alternativeBackground");
        _this.strokeOpacity = 1;
        _this.strokeWidth = 1;
        _this.shapeRendering = "crispEdges";
        _this.rotation = 0;
        // Create main group to store pattern elements inelements
        _this.element = _this.paper.addGroup("pattern");
        _this.id = "pattern-" + registry.getUniqueId();
        _this.element.attr({ "id": _this.id });
        _this._disposers.push(_this.element);
        // Make elements disposable
        _this._disposers.push(new ListDisposer(_this._elements));
        // Request again to trigger getter/setter code
        _this.patternUnits = _this.patternUnits;
        _this.width = _this.width;
        _this.height = _this.height;
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Draws the pattern.
     */
    Pattern.prototype.draw = function () {
        var _this = this;
        var patternElement = this.element;
        if (patternElement) {
            patternElement.removeChildNodes();
            var background = this.paper.add("rect");
            background.attr({ "width": this.width, "height": this.height, "shape-rendering": "crispEdges", "fill": this.backgroundFill.hex, "fill-opacity": this.backgroundOpacity, "stroke": this.backgroundFill.hex, "stroke-opacity": this.backgroundOpacity });
            patternElement.add(background);
            patternElement.attr({ "x": this.x, "y": this.y, "width": this.width, "height": this.height, "stroke": this.stroke.hex, "fill": this.fill.hex, "fill-opacity": this.fillOpacity, "stroke-opacity": this.strokeOpacity, "stroke-width": this.strokeWidth, "shape-rendering": this.shapeRendering, "patternUnits": this.patternUnits });
            $iter.each(this._elements.iterator(), function (element) {
                element.rotation = _this.rotation;
                _this.element.add(element);
            });
        }
    };
    /**
     * Animate pattern properties.
     *
     * @see {@link Animation}
     * @param  {IAnimationOptions[] | IAnimationOptions}  animationOptions  Animation options
     * @param  {number}                                   duration          Duration (ms)
     * @param  {(number) => number}                       easing            Easing function
     * @return {Animation}                                                  Animation instance
     */
    Pattern.prototype.animate = function (animationOptions, duration, easing) {
        return new Animation(this, animationOptions, duration, easing).start();
    };
    /**
     * Adds an element to the pattern.
     *
     * @param {AMElement}  element  Element
     */
    Pattern.prototype.addElement = function (element) {
        this._elements.push(element);
        this._disposers.push(element);
    };
    /**
     * Remove an element from the pattern.
     *
     * @param {AMElement}  element  Element
     */
    Pattern.prototype.removeElement = function (element) {
        this._elements.removeValue(element);
        this.removeDispose(element);
    };
    Object.defineProperty(Pattern.prototype, "fillOpacity", {
        /**
         * @return {number} Opacity (0-1)
         */
        get: function () {
            return this.properties["fillOpacity"];
        },
        /**
         * Pattern fill opacity. (0-1)
         *
         * @param {number}  value  Opacity (0-1)
         */
        set: function (value) {
            this.properties["fillOpacity"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "fill", {
        /**
         * @return {Color} Fill color
         */
        get: function () {
            return this.properties["fill"];
        },
        /**
         * Fill color of the pattern.
         *
         * @param {Color}  value  Fill color
         */
        set: function (value) {
            this.properties["fill"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "backgroundFill", {
        /**
         * @return {Color} Background color
         */
        get: function () {
            return this.properties["backgroundFill"];
        },
        /**
         * Pattern background fill color.
         *
         * @param {Color}  value  Background color
         */
        set: function (value) {
            this.properties["backgroundFill"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "backgroundOpacity", {
        /**
         * @return {number} Background opacity (0-1)
         */
        get: function () {
            return this.properties["backgroundOpacity"];
        },
        /**
         * Pattern backgorund opacity. (0-1)
         *
         * @param {number}  value  Background opacity (0-1)
         */
        set: function (value) {
            this.properties["backgroundOpacity"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "stroke", {
        /**
         * @return {Color} Color
         */
        get: function () {
            return this.properties["stroke"];
        },
        /**
         * Pattern stroke (border) color.
         *
         * @param {Color}  value  Color
         */
        set: function (value) {
            this.properties["stroke"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "strokeOpacity", {
        /**
         * @return {number} Opacity (0-1)
         */
        get: function () {
            return this.properties["strokeOpacity"];
        },
        /**
         * Pattern stroke opacity. (0-1)
         *
         * @param {number}  value  Opacity (0-1)
         */
        set: function (value) {
            this.properties["strokeOpacity"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "strokeWidth", {
        /**
         * @return {number} Stroke thickness (px)
         */
        get: function () {
            return this.properties["strokeWidth"];
        },
        /**
         * Pattern stroke thickness in pixels.
         *
         * @param {number}  value  Stroke thickness (px)
         */
        set: function (value) {
            this.properties["strokeWidth"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "shapeRendering", {
        get: function () {
            return this.properties["shapeRendering"];
        },
        /**
         * Shape rendering
         * @param {ShapeRendering} value [description]
         */
        set: function (value) {
            this.properties["shapeRendering"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "rotation", {
        /**
         * @return {number} Rotation
         */
        get: function () {
            return this.properties["rotation"];
        },
        /**
         * Pattern rotation in degrees.
         *
         * @param {number}  value  Rotation
         */
        set: function (value) {
            this.properties["rotation"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "patternUnits", {
        /**
         * @return {"userSpaceOnUse" | "objectBoundingBox"} Units
         */
        get: function () {
            return this.properties["patternUnits"];
        },
        /**
         * Pattern measuring units.
         *
         * Available options: "userSpaceOnUse" | "objectBoundingBox".
         *
         * @param {"userSpaceOnUse" | "objectBoundingBox"}  value  Units
         */
        set: function (value) {
            this.properties["patternUnits"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "width", {
        /**
         * @return {number} Width (px)
         */
        get: function () {
            return this.properties["width"];
        },
        /**
         * Pattern width in pixels.
         *
         * @param {number}  value  Width (px)
         */
        set: function (value) {
            this.properties["width"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "height", {
        /**
         * @return {number} Height (px)
         */
        get: function () {
            return this.properties["height"];
        },
        /**
         * Pattern height in pixels.
         *
         * @param {number} value Height (px)
         */
        set: function (value) {
            this.properties["height"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "x", {
        /**
         * @return {number} X (px)
         */
        get: function () {
            return this.properties["x"];
        },
        /**
         * X position. (pixels)
         *
         * @param {number} value X (px)
         */
        set: function (value) {
            this.properties["x"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "y", {
        /**
         * @return {number} Y (px)
         */
        get: function () {
            return this.properties["y"];
        },
        /**
         * Y position. (px)
         *
         * @param {number} value Y (px)
         */
        set: function (value) {
            this.properties["y"] = value;
            this.draw();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pattern.prototype, "paper", {
        /**
         * @ignore Exclude from docs
         * @return {Paper} Paper
         */
        get: function () {
            if (this._paper) {
                return this._paper;
            }
            return getSystem().ghostPaper;
        },
        /**
         * [[Paper]] instance to draw pattern in.
         *
         * @ignore Exclude from docs
         * @param {Paper}  paper  Paper
         */
        set: function (paper) {
            if (this._paper != paper) {
                this._paper = paper;
                this.draw();
                paper.appendDef(this.element);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Copies properties from another Pattern instance.
     *
     * @param {this}  source  Source pattern
     */
    Pattern.prototype.copyFrom = function (source) {
        var _this = this;
        _super.prototype.copyFrom.call(this, source);
        $object.each(source.properties, function (key, value) {
            _this[key] = value;
        });
    };
    Object.defineProperty(Pattern.prototype, "animations", {
        /**
         * A list of animations currently running on the patter.
         *
         * @ignore Exclude from docs
         * @return {Array<Animation>} Animation list
         */
        get: function () {
            if (!this._animations) {
                this._animations = [];
                this._disposers.push(new AnimationDisposer(this._animations));
            }
            return this._animations;
        },
        enumerable: true,
        configurable: true
    });
    return Pattern;
}(BaseObject));
export { Pattern };
//# sourceMappingURL=Pattern.js.map