<template>
  <div class="container">

    <h2> Erste Kontakt </h2>

    <label for="Name" > Name </label>
    <input class="form-control" name ="name" type="text"/>

    <label for="vorname" > Vorname </label>
    <input  class="form-control"  name ="vorname" type="text"/>

    <label for="email" > Email  </label>
    <input  class="form-control"  name ="email" type="text"/>

    <label for="beruf" > Beruf  </label>
    <input  class="form-control"  name ="beruf" type="text"/>

    <label for="beruf" > Beruf  </label>
    <input  class="form-control"  name ="beruf" type="text"/>

    <label for="anmerkungen" > Anmerkungen </label>
    <input  class="form-control" name ="Anmerkungen" type="text"/>

    <label for="anzahl einziehende Personen " > Anzahl einziehende Personen   </label>
    <input  class="form-control"  name ="anzahl einziehende Personen " type="number"/>

    <label for="gehalt" > Gehalt  </label>
    <input  class="form-control"  name ="gehalt" type="number"/>

    <label for="anzahl des zimmers" > Anzahl des Zimmers  </label>
    <input  class="form-control"  name ="anzahl des Zimmers" type="number"/>



    <button> Hochladen</button>
  </div>
</template>

<script>
export default {
  name: "Formular als Mieterinnen und Mieter"
}
</script>

<style scoped>

</style>