export default defineNuxtPlugin(() => ({
  provide: {
    goBack: (name: string) => {
      const router = useRouter()
      const localePath = useLocalePath()
      if (name) router.push(localePath({ name }))
      else router.go(-1)
    }
  }
}))
