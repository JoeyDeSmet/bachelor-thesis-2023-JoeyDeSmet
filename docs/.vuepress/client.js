import { defineClientConfig } from '@vuepress/client';

import 'vuetify/styles'
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import '@mdi/font/css/materialdesignicons.css'

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
