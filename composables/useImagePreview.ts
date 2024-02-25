import { ref, Ref } from 'vue'
import image from '~/assets/images/no-image.jpeg'

interface FileWithPreview extends File {
  preview: string
}

export function useImagePreview(existingImage?: string | Ref<string> = image) {
  const previewImage: Ref<string> = ref(existingImage)
  const previewImages: Ref<string[]> = ref([])

  const setImagePreview = (file: FileWithPreview) => {
    previewImage.value = URL.createObjectURL(file)
  }

  const setMultipleImagePreviews = (files: FileList) => {
    const fileArray: FileWithPreview[] = Array.from(files) as FileWithPreview[]
    const previews: string[] = fileArray.map((file) => {
      file.preview = URL.createObjectURL(file)
      return file.preview
    })
    previewImages.value = previews
  }

  const removeMultiplePreviewImage = (index: number) => {
    if (previewImages.value.length) previewImages.value.splice(index, 1)
  }

  return {
    previewImage,
    previewImages,
    setImagePreview,
    setMultipleImagePreviews,
    removeMultiplePreviewImage
  }
}
