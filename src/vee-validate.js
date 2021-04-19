import Vue from "vue";
import { extend, localize } from "vee-validate";
import { required, email, min, alpha_spaces, confirmed, alpha_num} from "vee-validate/dist/rules";
import es from "vee-validate/dist/locale/es.json";

// Install required rule.
extend("required", required);

// Install email rule.
extend("email", email);

// Install email rule.
extend("alpha_num", alpha_num);

// Install email rule.
extend("alpha_spaces", alpha_spaces);


// Install min rule.
extend("confirmed", confirmed);

// Install min rule.
extend("min", min);

// Install English and Arabic localizations.
localize({
  en: {
    messages: es.messages,
  },
});

let LOCALE = "es";

// A simple get/set interface to manage our locale in components.
// This is not reactive, so don't create any computed properties/watchers off it.
Object.defineProperty(Vue.prototype, "locale", {
  get() {
    return LOCALE;
  },
  set(val) {
    LOCALE = val;
    localize(val);
  }
});