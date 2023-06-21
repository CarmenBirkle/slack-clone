import { Component, OnInit } from '@angular/core';
import { editorConfig } from './../service/editor-config';
import { Post } from 'src/models/post.class';
import {
  Firestore,
  collection,
  collectionData,
  setDoc,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-text-edit',
  templateUrl: './text-edit.component.html',
  styleUrls: ['./text-edit.component.scss'],
})
export class TextEditComponent {
  editorConfig = editorConfig;
  editorContent: string = '';
  post: Post = new Post();
  channelId: string = '';

  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.channelId = params['id'];
    });
  }

  savePost() {
    console.log('savePost aufgerufen');
    //TODO: author actual hardcoded, later dynamic
    this.post.author = 'hKhYyf1A2qOwLSyxTymq';
    this.post.timestamp = new Date().getTime();
    this.post.message = this.editorContent;
    console.log(this.post);
    this.addPost();
  }

  onEditorContentChange(event: any) {
    console.log(this.editorContent); // Prints the current content of the editor
  }



  async addPost() {
    console.log('addPost aufgerufen - channel: ', this.channelId);
    const docRef = await addDoc(
      collection(this.firestore, 'posts'),
      this.post.toJson()
    );
    this.post.id = docRef.id;
    console.log('Document written with ID: ', docRef.id);
this.editorContent = '';
    // Get the current channel object
    const channelDoc = doc(this.firestore, 'channels', this.channelId);
    const channelSnap = await getDoc(channelDoc);

    if (channelSnap.exists()) {
      // Add the new post ID to the channelPosts array
      const channelData = channelSnap.data();
      channelData['channelPosts'].push(this.post.id);

      // Update the channel document in Firestore
      await updateDoc(channelDoc, { channelPosts: channelData['channelPosts'] });
    }
     
}
  }

  ///
  //

  // async function addPost() {
  //   const docRef = await addDoc(collection(this.firestore, "posts"), {
  //     message: this.editorContent,
  //     channelId: this.channelId,
  //     // hier können Sie alle anderen Felder hinzufügen, die Sie benötigen
  //   });

  //   console.log("Document written with ID: ", docRef.id);
  // }

