import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

// FileUpload Component
const fileUploadVariants = cva(
  [
    'relative',
    'w-full',
    'border-2 border-dashed',
    'rounded-xl',
    'transition-all duration-[280ms]',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        default: 'bg-white/5 border-white/20 hover:border-white/30 hover:bg-white/10',
        dropzone: 'min-h-[200px] flex flex-col items-center justify-center',
        inline: 'p-0 border-0 bg-transparent hover:bg-transparent',
      },
      agent: {
        bigSis: 'data-[dragging=true]:border-cyan-500 data-[dragging=true]:bg-cyan-500/10',
        bro: 'data-[dragging=true]:border-orange-500 data-[dragging=true]:bg-orange-500/10',
        lilSis: 'data-[dragging=true]:border-purple-500 data-[dragging=true]:bg-purple-500/10',
        cbo: 'data-[dragging=true]:border-green-500 data-[dragging=true]:bg-green-500/10',
      },
      state: {
        idle: '',
        dragging: 'scale-[1.02]',
        error: 'border-red-500 bg-red-500/10',
      },
    },
    defaultVariants: {
      variant: 'default',
      agent: 'bigSis',
      state: 'idle',
    },
  }
);

export interface FileInfo {
  file: File;
  id: string;
  progress?: number;
  status?: 'pending' | 'uploading' | 'complete' | 'error';
  error?: string;
}

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>,
    VariantProps<typeof fileUploadVariants> {
  onFilesChange?: (files: FileInfo[]) => void;
  onFileRemove?: (fileId: string) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  showPreview?: boolean;
  showProgress?: boolean;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      variant = 'default',
      agent = 'bigSis',
      onFilesChange,
      onFileRemove,
      maxFiles = 10,
      maxSize = 10 * 1024 * 1024, // 10MB
      acceptedTypes,
      multiple = true,
      showPreview = true,
      showProgress = true,
      disabled = false,
      className,
      ...props
    }
  ) => {
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const agentColors = {
      bigSis: 'text-cyan-400',
      bro: 'text-orange-400',
      lilSis: 'text-purple-400',
      cbo: 'text-green-400',
    };

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const validateFile = (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`;
      }
      if (acceptedTypes && acceptedTypes.length > 0) {
        const fileType = file.type || '';
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
        const isAccepted = acceptedTypes.some(type => {
          if (type.includes('*')) {
            const [category] = type.split('/');
            return fileType.startsWith(category);
          }
          return fileType === type || `.${fileExtension}` === type;
        });
        if (!isAccepted) {
          return `File type not accepted. Accepted types: ${acceptedTypes.join(', ')}`;
        }
      }
      return null;
    };

    const handleFiles = useCallback((fileList: FileList | null) => {
      if (!fileList) return;

      const newFiles: FileInfo[] = [];
      const errors: string[] = [];

      Array.from(fileList).forEach(file => {
        if (files.length + newFiles.length >= maxFiles) {
          errors.push(`Maximum ${maxFiles} files allowed`);
          return;
        }

        const validationError = validateFile(file);
        if (validationError) {
          errors.push(`${file.name}: ${validationError}`);
          return;
        }

        newFiles.push({
          file,
          id: `${Date.now()}-${Math.random()}`,
          status: 'pending',
          progress: 0,
        });
      });

      if (errors.length > 0) {
        setError(errors.join('\n'));
        setTimeout(() => setError(null), 5000);
      }

      if (newFiles.length > 0) {
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
        onFilesChange?.(updatedFiles);
      }
    }, [files, maxFiles, acceptedTypes, maxSize, onFilesChange]);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget === e.target) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (!disabled) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
    };

    const handleRemoveFile = (fileId: string) => {
      const updatedFiles = files.filter(f => f.id !== fileId);
      setFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
      onFileRemove?.(fileId);
    };

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    return (
      <div className={cn('space-y-4', className)}>
        <div
          onClick={handleClick}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging}
          className={cn(
            fileUploadVariants({ 
              variant, 
              agent, 
              state: error ? 'error' : isDragging ? 'dragging' : 'idle' 
            }),
            disabled && 'opacity-50 cursor-not-allowed',
            variant === 'dropzone' && 'p-8'
          )}
        >
          <input
            ref={inputRef}
            type="file"
            multiple={multiple}
            accept={acceptedTypes?.join(',')}
            onChange={handleInputChange}
            disabled={disabled}
            className="sr-only"
            {...props}
          />

          {variant === 'dropzone' && (
            <>
              <svg
                className={cn('w-12 h-12 mb-4', agent && agentColors[agent])}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              
              <p className="text-sm font-medium mb-1">
                Drop files here or click to upload
              </p>
              
              <p className="text-xs text-gray-500">
                {acceptedTypes ? `Accepted: ${acceptedTypes.join(', ')}` : 'All file types accepted'}
                {' • '}
                Max size: {formatFileSize(maxSize)}
              </p>
            </>
          )}

          {variant === 'inline' && (
            <button
              type="button"
              className={cn(
                'px-4 py-2',
                'bg-white/10 hover:bg-white/20',
                'border border-white/20',
                'rounded-lg',
                'text-sm font-medium',
                'transition-all duration-[280ms]',
                agent && agentColors[agent]
              )}
            >
              Choose Files
            </button>
          )}
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-400 whitespace-pre-line">{error}</p>
          </div>
        )}

        {showPreview && files.length > 0 && (
          <FileList
            files={files}
            onRemove={handleRemoveFile}
            showProgress={showProgress}
            agent={agent || undefined}
          />
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

// FileList Component
interface FileListProps {
  files: FileInfo[];
  onRemove?: (fileId: string) => void;
  showProgress?: boolean;
  agent?: 'bigSis' | 'bro' | 'lilSis' | 'cbo';
}

const FileList: React.FC<FileListProps> = ({
  files,
  onRemove,
  showProgress = true,
  agent = 'bigSis',
}) => {
  const agentColors = {
    bigSis: 'bg-cyan-500',
    bro: 'bg-orange-500',
    lilSis: 'bg-purple-500',
    cbo: 'bg-green-500',
  };

  const statusIcons = {
    pending: (
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    uploading: (
      <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
    ),
    complete: (
      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: File) => {
    const type = file.type || '';
    
    if (type.startsWith('image/')) {
      return URL.createObjectURL(file);
    }
    
    return null;
  };

  return (
    <div className="space-y-2">
      {files.map(fileInfo => {
        const icon = getFileIcon(fileInfo.file);
        
        return (
          <div
            key={fileInfo.id}
            className="relative p-3 bg-white/5 border border-white/20 rounded-lg"
          >
            <div className="flex items-center gap-3">
              {/* File icon/preview */}
              {icon ? (
                <img
                  src={icon}
                  alt={fileInfo.file.name}
                  className="w-10 h-10 rounded object-cover"
                  onLoad={() => URL.revokeObjectURL(icon)}
                />
              ) : (
                <div className="w-10 h-10 bg-white/10 rounded flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}

              {/* File info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {fileInfo.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(fileInfo.file.size)}
                  {fileInfo.error && <span className="text-red-400 ml-2">{fileInfo.error}</span>}
                </p>
              </div>

              {/* Status icon */}
              {fileInfo.status && statusIcons[fileInfo.status]}

              {/* Remove button */}
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(fileInfo.id)}
                  className="p-1 rounded hover:bg-white/10 transition-all duration-[280ms]"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Progress bar */}
            {showProgress && fileInfo.status === 'uploading' && fileInfo.progress !== undefined && (
              <div className="mt-2">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-[280ms]',
                      agentColors[agent]
                    )}
                    style={{ width: `${fileInfo.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// DropZone Component
export interface DropZoneProps extends FileUploadProps {
  height?: number | string;
}

export const DropZone = forwardRef<HTMLInputElement, DropZoneProps>(
  ({ height = 200, className, ...props }, ref) => {
    return (
      <FileUpload
        ref={ref}
        variant="dropzone"
        className={className}
        style={{ minHeight: height }}
        {...props}
      />
    );
  }
);

DropZone.displayName = 'DropZone';