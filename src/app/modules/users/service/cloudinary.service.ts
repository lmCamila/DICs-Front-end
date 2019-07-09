import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  cloudName = 'dereqydhf';
  unsignedUploadPreset = 'rcub5wyo';
  issueEventupload = new EventEmitter<number>();
  issueUrlResponse = new EventEmitter<string>();

  constructor() { }

  upload(file) {
    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('x-Requested-With', 'XMLHttpRequest');
    // mostrar progresso do arquivo
    xhr.upload.addEventListener('progress', (e) => {
      const progress = Math.round((e.loaded * 100.0) / e.total);
      this.issueEventupload.emit(progress);
    });

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        const urlCloud = response.secure_url;
        const tokens = urlCloud.split('/');
        tokens.splice(-2, 0, 'h_250,w_250,c_scale');
        const urlReturn = tokens.join('/');
        this.issueUrlResponse.emit(urlReturn);
      }
    };
    fd.append('upload_preset', this.unsignedUploadPreset);
    fd.append('tags', 'browser_upload');
    fd.append('file', file);
    xhr.send(fd);
  }
}
