import { Client, Databases, Query, Storage, ID } from "appwrite";
import conf from "../conf/conf";

class Config {
  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // Appwrite Database services
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("AppwriteService :: getPost():: ", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("AppwriteService :: getPosts :: ", error);

      return false;
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost() :: ", error);
      return false;
    }
  }

  async updatePost(documentId, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log("Appwrite service :: updateDocument() :: ", error);
      return false;
    }
  }

  async deletePost(documentId) {
    try {
      return await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        documentId
      );
    } catch (error) {
      console.log("Appwirte Service :: deletePost() :: ", error);
      return false;
    }
  }

  // Appwrite Storage Services
  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        conf.appwrtieBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: createFile() :: ", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return this.storage.deleteFile(conf.appwrtieBucketId, fileId);
    } catch (error) {
      console.log("Appwrite Service :: deleteFile() :: ", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(conf.appwrtieBucketId, fileId);
  }
}

const config = new Config();
export default config;
