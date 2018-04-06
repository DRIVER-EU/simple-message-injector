<template>
  <div class="message">
    <h2>Large Update Message Form</h2>
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s9">
            <input placeholder="..." v-model="url" id="url" type="text" class="validate">
            <label for="url">URL of file or folder</label>
          </div>
          <div class="input-field col s3">
            <select v-model="dataType">
              <optgroup label="images">
                <option value="image_bmp">bmp</option>
                <option value="image_gif">gif</option>
                <option value="image_geotiff">geotiff</option>
                <option value="image_jpeg">jpeg</option>
                <option value="image_png">png</option>
              </optgroup>
              <optgroup label="video">
                <option value="video_mpeg">mpeg</option>
                <option value="video_msvideo">msvideo</option>
                <option value="video_avi">avi</option>
              </optgroup>
              <optgroup label="applications">
                <option value="msword">msword</option>
                <option value="pdf">pdf</option>
                <option value="excel">excel</option>
                <option value="powerpoint">powerpoint</option>
                <option value="zip">zip</option>
                <option value="other">other</option>
              </optgroup>
              <optgroup label="text">
                <option value="json">json</option>
                <option value="geojson">geojson</option>
                <option value="text_plain">text</option>
              </optgroup>
              <optgroup label="audio">
                <option value="audio_mpeg">mpeg</option>
                <option value="audio_vorbis">x</option>
              </optgroup>
            </select>
            <label>Data type</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="..." v-model="title" id="title" type="text" class="validate">
            <label for="title">Title</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <textarea id="description" v-model="description" type="text" class="materialize-textarea validate"></textarea>
            <label for="description">Description</label>
          </div>
        </div>
      </form>
    </div>
    <div class="row right-align" style="margin: 20px">
      <button class="btn waves-effect waves-light" type="submit" @click="submitMessage" name="action">Submit
        <i class="material-icons right">send</i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class LargeUpdateMessage extends Vue {
  private url: string = '';
  private title: string = '';
  private description: string = '';
  private dataType: string = 'image_geotiff';

  public mounted() {
    const elem = document.querySelector('select');
    const instance = M.FormSelect.init(elem);
    M.updateTextFields();
  }

  public submitMessage(event: any) {
    alert(`event: ${event}, url: ${this.url}, title: ${this.title}, type: ${this.dataType}, desc: ${this.description}.`);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.message {
  max-width: 800px;
  margin: auto;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
