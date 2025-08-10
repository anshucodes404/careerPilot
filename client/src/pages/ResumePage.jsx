import React, { useRef, useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { useAuth } from "@clerk/clerk-react";
import { useUrl } from '../context/urlContext'


const ResumePage = () => {
  const {url} = useUrl()
  const { getToken } = useAuth()
  const fileInput = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFileSelect = (file) => {
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setSelectedFile(file)
      setUploadStatus(null)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadStatus(null)

    try {
      const token = await getToken()
      const formData = new FormData()
      formData.append("resume", selectedFile)

      const res = await fetch(`${url}/api/resumes/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });

      if (res.ok) {
        const data = await res.json()
        console.log(data.data)
        setUploadStatus({ type: 'success', message: 'Resume uploaded successfully!' })
        setSelectedFile(null)
        if (fileInput.current) fileInput.current.value = ''
      } else {
        setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' })
      }
    } catch (error) {
      console.error(error)
      setUploadStatus({ type: 'error', message: 'Network error. Please check your connection.' })
    } finally {
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (fileType) => {
    if (fileType === 'application/pdf') return '📄'
    if (fileType.startsWith('image/')) return '🖼️'
    return '📁'
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-2">Resume Upload</h1>
          <p className="text-neutral-700 dark:text-neutral-300 text-lg">
            Upload your resume to keep track of your career progress
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="shadow-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black dark:text-white">
                <span className="text-2xl">📤</span>
                Upload Resume
              </CardTitle>
              <CardDescription className="text-neutral-600 dark:text-neutral-400">
                Drag and drop your resume here or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer
                  hover:border-neutral-400 hover:bg-neutral-50 dark:hover:border-neutral-600 dark:hover:bg-neutral-800
                  ${dragActive ? 'border-neutral-500 bg-neutral-100 dark:border-neutral-600 dark:bg-neutral-800' : 'border-neutral-300 dark:border-neutral-700'}
                  ${selectedFile ? 'border-green-400 bg-green-50 dark:border-green-600 dark:bg-neutral-800' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInput.current?.click()}
              >
                <div className="space-y-4">
                  <div className="text-4xl">
                    {selectedFile ? getFileIcon(selectedFile.type) : '📁'}
                  </div>
                  <div>
                    <p className="text-lg font-medium text-black dark:text-white">
                      {selectedFile ? selectedFile.name : 'Drop your resume here'}
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      {selectedFile
                        ? `Size: ${formatFileSize(selectedFile.size)}`
                        : 'or click to browse files'
                      }
                    </p>
                  </div>
                  {!selectedFile && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary">PDF</Badge>
                      <Badge variant="secondary">JPG</Badge>
                      <Badge variant="secondary">PNG</Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Hidden File Input */}
              <Input
                ref={fileInput}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileInput}
                className="hidden"
              />

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full h-12 text-lg font-medium"
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Uploading...
                  </div>
                ) : (
                  'Upload Resume'
                )}
              </Button>

              {/* Status Message */}
              {uploadStatus && (
                <div className={`p-4 rounded-lg ${
                  uploadStatus.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700'
                    : 'bg-red-100 text-red-800 border border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700'
                }`}>
                  {uploadStatus.message}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Info Section */}
          <Card className="shadow-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black dark:text-white">
                <span className="text-2xl">ℹ️</span>
                Upload Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white">Supported Formats</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">PDF, JPG, JPEG, and PNG files are supported</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white">File Size</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Maximum file size: 10MB</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white">Security</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Your resume is securely stored and encrypted</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-neutral-800 dark:text-neutral-200 text-sm font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-black dark:text-white">Access</h4>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">You can access your resume anytime from your profile</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                <h4 className="font-medium text-black dark:text-white mb-2">💡 Tip</h4>
                <p className="text-sm text-neutral-800 dark:text-neutral-200">
                  Keep your resume updated with your latest experience and skills to increase your chances of getting hired.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ResumePage
