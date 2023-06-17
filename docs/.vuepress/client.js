import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import "vuetify/dist/vuetify.min.css";
import '@mdi/font/css/materialdesignicons.css'

import { defineClientConfig } from '@vuepress/client';

export default defineClientConfig({
    enhance: (context) => {
        const vuetify = createVuetify({
            components,
            directives,
            theme: {
                dark: true,
            },
        });

        context.app.use(vuetify);
    }
});
