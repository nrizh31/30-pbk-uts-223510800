<template>
  <div>
    <form @submit.prevent="submitPost">
      <label for="userSelect">Pilih User:</label>
      <select id="userSelect" v-model="selectedUser" required>
        <option value="" disabled>Pilih User</option>
        <option v-for="user in users" :key="user.id" :value="user">{{ user.name }}</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { id: 1, name: 'Naufal Rizh' },
        { id: 2, name: 'Aldo Albert' },
        { id: 3, name: 'Teguh Starboy' },
        { id: 4, name: 'Rifky Fxrusy' },
      ],
      selectedUser: ''
    }
  },
  methods: {
    submitPost() {
      alert(`Post submitted for user: ${this.selectedUser.name}`);
      this.selectedUser = '';
    }
  }
}
</script>

<style>
/* styles here */
</style>
