export default defineNuxtRouteMiddleware((to) => {
  const lang = to.params.lang;
  if (lang !== undefined && !(locales as readonly string[]).includes(lang as string)) {
    return abortNavigation(createError({ statusCode: 404, statusMessage: 'Page not found' }));
  }
});
