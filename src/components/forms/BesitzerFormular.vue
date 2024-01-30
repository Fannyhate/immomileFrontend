<template>
  <div class="container">

    <h2> Online Formular </h2>

    <label for="Name" > Name </label>
    <input class="form-control" name ="name" type="text"/>

    <label for="vorname" > Vorname </label>
    <input  class="form-control"  name ="vorname" type="text"/>

    <label for="email" > Email  </label>
    <input  class="form-control"  name ="email" type="text"/>

    <label for="beruf" > Beruf  </label>
    <input  class="form-control"  name ="beruf" type="text"/>

    <label for="beschreibung" > Beschreibung  </label>
    <input  class="form-control" name ="beschreibung" type="text"/>



    <button> Hochladen</button>
  </div>
</template>
export default {
  name: "Formuler als Besitzer von Wohnungen"
}
</script>

<style scoped>

</style>