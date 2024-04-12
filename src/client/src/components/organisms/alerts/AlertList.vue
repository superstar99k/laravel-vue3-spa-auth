<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
import Alert from '@/components/molecules/alerts/Alert.vue'
import * as messageType from '@/constants/messageType'

const store = useStore()

const props = defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
})

const alerts = computed(() => {
  const alerts = Object.values(messageType).reduce(
    (alerts, type) => ({
      ...alerts,
      [type]: store.getters[`alert/${type}`],
    }),
    {}
  )

  alerts.error = (alerts.error || []).concat(props.errors)

  return Object.keys(alerts).reduce((formattedAlerts, key) => {
    formattedAlerts[key] = (alerts[key] ?? []).map((alert) => {
      console.log('alert', alert, key)
      if (typeof alert === 'string') {
        return { title: alert, message: '' }
      }

      return alert
    })

    return formattedAlerts
  }, {})
})

const hasAny = () => {
  const alerts = alerts
  return Object.keys(alerts).some((type) => alerts[type].length > 0)
}
</script>

<template>
  <div v-if="hasAny">
    <template v-for="(alertLevel, i) in Object.keys(alerts)">
      <Alert
        v-for="(alert, j) in alerts[alertLevel]"
        :key="`${i}_${j}`"
        :title="alert.title"
        :type="alertLevel"
        class="mb-2"
      >
        {{ alert.message }}
      </Alert>
    </template>
  </div>
</template>
