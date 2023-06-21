export default defineNuxtPlugin(() => ({
  provide: {
    goBack: name => {
      const router = useRouter();
      if (name) router.push({ name });
      else router.go(-1);
    }
  }
}));
