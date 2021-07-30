module.exports = {
    "root": true,
    //"parser": "babel-eslint",
    "parserOptions": {
        "parser": "babel-eslint",
        "sourceType": "module",
        "ecmaVersion": 6,
        "ecmaFeatures": {
            //"jsx": true,
            //"experimentalObjectRestSpread": true
        }
    },
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        "eslint:recommended"
    ],
    // required to lint *.vue files
    "plugins": [
        "html"
    ],
    // check if imports actually resolve
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "./webpack.base.conf.js"
            }
        }
    },
    // add your custom rules here
    "rules": {
        // don"t require .vue extension when importing
        // "import/extensions": ["error", "always", {
        //     "js": "never",
        //     "vue": "never"
        // }],
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

        // require the use of === and !==
        "eqeqeq": ["warn", "smart"],

        // enforce consistent indentation
        "indent": ["warn", 4, { SwitchCase: 1 }],//2 space indentation with enabled switch cases indentation

        "no-tabs": "off",

        // enforce the consistent use of either double or single quotes in JSX attributes
        "jsx-quotes": "error",

        // enforce the consistent use of either backticks, double, or single quotes
        "quotes": ["warn", "single"],

        // require or disallow semicolons instead of ASI
        "semi": ["error", "always"],
    }
}
