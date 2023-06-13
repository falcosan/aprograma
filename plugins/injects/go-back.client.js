export default defineNuxtPlugin(() => ({
  provide: {
    goBack: () => {
      const router = useRouter();
      router.back();
    }
  }
}));
