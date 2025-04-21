import type { CustomThemeConfig } from "@skeletonlabs/tw-plugin";

export const hyperbolaTheme: CustomThemeConfig = {
  name: "hyperbola-theme",
  properties: {
    // =~= Theme Properties =~=
    "--theme-font-family-base": `system-ui`,
    "--theme-font-family-heading": `system-ui`,
    "--theme-font-color-base": "0 0 0",
    "--theme-font-color-dark": "255 255 255",
    "--theme-rounded-base": "8px",
    "--theme-rounded-container": "6px",
    "--theme-border-base": "1px",
    // =~= Theme On-X Colors =~=
    "--on-primary": "0 0 0",
    "--on-secondary": "0 0 0",
    "--on-tertiary": "0 0 0",
    "--on-success": "0 0 0",
    "--on-warning": "0 0 0",
    "--on-error": "255 255 255",
    "--on-surface": "255 255 255",
    // =~= Theme Colors  =~=
    // primary | #23cf9b
    "--color-primary-50": "222 248 240", // #def8f0
    "--color-primary-100": "211 245 235", // #d3f5eb
    "--color-primary-200": "200 243 230", // #c8f3e6
    "--color-primary-300": "167 236 215", // #a7ecd7
    "--color-primary-400": "101 221 185", // #65ddb9
    "--color-primary-500": "35 207 155", // #23cf9b
    "--color-primary-600": "32 186 140", // #20ba8c
    "--color-primary-700": "26 155 116", // #1a9b74
    "--color-primary-800": "21 124 93", // #157c5d
    "--color-primary-900": "17 101 76", // #11654c
    // secondary | #00a093
    "--color-secondary-50": "217 241 239", // #d9f1ef
    "--color-secondary-100": "204 236 233", // #ccece9
    "--color-secondary-200": "191 231 228", // #bfe7e4
    "--color-secondary-300": "153 217 212", // #99d9d4
    "--color-secondary-400": "77 189 179", // #4dbdb3
    "--color-secondary-500": "0 160 147", // #00a093
    "--color-secondary-600": "0 144 132", // #009084
    "--color-secondary-700": "0 120 110", // #00786e
    "--color-secondary-800": "0 96 88", // #006058
    "--color-secondary-900": "0 78 72", // #004e48
    // tertiary | #0092f6
    "--color-tertiary-50": "217 239 254", // #d9effe
    "--color-tertiary-100": "204 233 253", // #cce9fd
    "--color-tertiary-200": "191 228 253", // #bfe4fd
    "--color-tertiary-300": "153 211 251", // #99d3fb
    "--color-tertiary-400": "77 179 249", // #4db3f9
    "--color-tertiary-500": "0 146 246", // #0092f6
    "--color-tertiary-600": "0 131 221", // #0083dd
    "--color-tertiary-700": "0 110 185", // #006eb9
    "--color-tertiary-800": "0 88 148", // #005894
    "--color-tertiary-900": "0 72 121", // #004879
    // success | #49c568
    "--color-success-50": "228 246 232", // #e4f6e8
    "--color-success-100": "219 243 225", // #dbf3e1
    "--color-success-200": "210 241 217", // #d2f1d9
    "--color-success-300": "182 232 195", // #b6e8c3
    "--color-success-400": "128 214 149", // #80d695
    "--color-success-500": "73 197 104", // #49c568
    "--color-success-600": "66 177 94", // #42b15e
    "--color-success-700": "55 148 78", // #37944e
    "--color-success-800": "44 118 62", // #2c763e
    "--color-success-900": "36 97 51", // #246133
    // warning | #edbe31
    "--color-warning-50": "252 245 224", // #fcf5e0
    "--color-warning-100": "251 242 214", // #fbf2d6
    "--color-warning-200": "251 239 204", // #fbefcc
    "--color-warning-300": "248 229 173", // #f8e5ad
    "--color-warning-400": "242 210 111", // #f2d26f
    "--color-warning-500": "237 190 49", // #edbe31
    "--color-warning-600": "213 171 44", // #d5ab2c
    "--color-warning-700": "178 143 37", // #b28f25
    "--color-warning-800": "142 114 29", // #8e721d
    "--color-warning-900": "116 93 24", // #745d18
    // error | #af1232
    "--color-error-50": "243 219 224", // #f3dbe0
    "--color-error-100": "239 208 214", // #efd0d6
    "--color-error-200": "235 196 204", // #ebc4cc
    "--color-error-300": "223 160 173", // #dfa0ad
    "--color-error-400": "199 89 112", // #c75970
    "--color-error-500": "175 18 50", // #af1232
    "--color-error-600": "158 16 45", // #9e102d
    "--color-error-700": "131 14 38", // #830e26
    "--color-error-800": "105 11 30", // #690b1e
    "--color-error-900": "86 9 25", // #560919
    // surface | #2d433a
    "--color-surface-50": "224 227 225", // #e0e3e1
    "--color-surface-100": "213 217 216", // #d5d9d8
    "--color-surface-200": "203 208 206", // #cbd0ce
    "--color-surface-300": "171 180 176", // #abb4b0
    "--color-surface-400": "108 123 117", // #6c7b75
    "--color-surface-500": "45 67 58", // #2d433a
    "--color-surface-600": "41 60 52", // #293c34
    "--color-surface-700": "34 50 44", // #22322c
    "--color-surface-800": "27 40 35", // #1b2823
    "--color-surface-900": "22 33 28", // #16211c
  },
};
