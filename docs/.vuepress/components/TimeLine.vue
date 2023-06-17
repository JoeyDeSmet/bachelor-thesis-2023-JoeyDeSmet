<script setup lang="ts">
  import { computed } from '@vue/reactivity';
  import { ref, onMounted } from 'vue';

  const items = [
    {
      icon: 'mdi-star',
      color: 'red-lighten-2',
      title: 'Inleiding',
      description: 'Inleiding Holiday Suites en de Todo App.',
      link: '/introduction'
    },
    {
      icon: 'mdi-atom',
      color: 'purple-lighten-1',
      title: 'Technologieën',
      description: 'Uitleg gebruikte technologieën: Blazor en ASP.NET Core Web API en Entity Framework Core.',
      link: '/01-chapter-technologien'
    },
    {
      icon: 'mdi-calendar-clock',
      color: 'deep-purple-lighten-1',
      title: 'Terugkerende taken',
      description: 'Ontwikkeling systeem voor terugkerende taken, om het manueel aanmaken van terugkerende taken over te nemen van de gebruiker.',
      link: '/02-chapter-terugkerende-taken'
    },
    {
      icon: 'mdi-bug',
      color: 'indigo-lighten-2',
      title: 'Crash report systeem',
      description: 'Ontwikkeling crash report systeem voor de Todo App. Naar aanleiding van weinig informatie te ontvangen tijdens de testfase.',
      link: '/03-chapter-crash-report'
    },
    {
      icon: 'mdi-shield-account',
      color: 'blue-lighten-1',
      title: 'Herwerking authenticatie',
      description: 'Herwerking authenticatie met JWT tokens. Om voorgaande problemen gevonden door het crash report systeem op te lossen, en de gebruikservaring te verbeteren.',
      link: '/04-chapter-jwt'
    },
    {
      icon: 'mdi-spider-web',
      color: 'cyan-darken-1',
      title: 'Live reactiviteit met SignalR',
      description: 'Toevoeging van live reactiviteit, zodat belangrijke informatie zoals last minute schoonmaken direct zichtbaar zijn.',
      link: '/05-chapter-signal-r'
    },
    {
      icon: 'mdi-chart-bar',
      color: 'teal-lighten-2',
      title: 'Statistieken',
      description: 'Ontwikkeling statistieken voor schoonmaaktaken, om een inzicht te krijgen over de duurtijd over de verschillende types appartementen. Dit om de ervaring van de klant te verbeteren.',
      link: '/06-chapter-statistics'
    },
    {
      icon: 'mdi-badge-account-alert-outline',
      color: 'green-lighten-1',
      title: 'User logging systeem',
      description: 'Ontwikkeling logging systeem om een overzicht te krijgen van de acties van de gebruikers, zodat onverwachte aanpassingen aan de data kunnen worden opgespoord.',
      link: '/07-chapter-user-logging'
    },
    {
      icon: 'mdi-account-question',
      color: 'light-green-darken-1',
      title: 'Reflectie',
      description: 'Reflectie over mijn stage/bachelorproef bij Holiday Suites. Successen en valkuilen dat ik heb meegemaakt.',
      link: '/08-chapter-reflectie'
    },
    {
      icon: 'mdi-auto-mode',
      color: 'lime-darken-3',
      title: 'Conclusie',
      description: 'Conclusie ontwikkeling van een plannings- en opvolgingsapplicatie voor logistieke taken de Todo App.',
      link: '/conclusion'
    }
  ];

  const isDark = ref(false);

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark');

    let toggleThemeButton = document.querySelector('.toggle-color-mode-button');

    if (toggleThemeButton !== null) {
      toggleThemeButton.addEventListener('click', () => {
        isDark.value = !isDark.value;
      });
    }
  });

  const lineColor = computed(() => {
    return isDark.value ? 'grey' : '';
  });

</script>

<template>
  <v-timeline align="start" :line-color="lineColor">
    <v-timeline-item
      v-for="(item, i) in items"
      :key="i"
      fill-dot
      size='small' 
      :icon="item.icon"
      :dot-color="item.color"
    >
      <div>
        <h2 :class="`mt-n1 headline font-weight-light mb-4 pt-0 text-${item.color}`">
          {{ item.title }}
        </h2>
        <div class="my-2">
          {{ item.description }}
        </div>
        <router-link
          :to="item.link"
          class="text-decoration-none"
        >
          <v-btn
            :color="item.color"
            :dark="!isDark"
            small
            class="mb-2 mt-1"
          >
            Lees meer
          </v-btn>
        </router-link>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>