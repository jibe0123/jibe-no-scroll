import { useState } from 'react';

export type FileSystem = {
  currentPath: string;
  files: Record<string, string | string[]>;
};

export const useTerminalCommands = () => {
  const [fileSystem, setFileSystem] = useState<FileSystem>({
    currentPath: '~',
    files: {
      '~': ['projects', 'skills', 'contact', 'readme.md'],
      'projects': ['portfolio-site', 'ai-chatbot', 'blockchain-explorer', 'devops-tools'],
      'skills': ['frontend', 'backend', 'devops', 'ai-ml'],
      'contact': []
    }
  });

  const navigateDirectory = (path: string): { success: boolean; message: string } => {
    if (path === '..') {
      if (fileSystem.currentPath === '~') {
        return { success: false, message: 'Already at root directory' };
      }
      setFileSystem(prev => ({ ...prev, currentPath: '~' }));
      return { success: true, message: '' };
    }

    const currentFiles = fileSystem.files[fileSystem.currentPath];
    if (Array.isArray(currentFiles) && currentFiles.includes(path)) {
      setFileSystem(prev => ({ ...prev, currentPath: path }));
      return { success: true, message: '' };
    }

    return { success: false, message: `Directory not found: ${path}` };
  };

  const listDirectory = (): string => {
    const currentFiles = fileSystem.files[fileSystem.currentPath];
    if (Array.isArray(currentFiles)) {
      return currentFiles.map(file => `📁 ${file}`).join('\n');
    }
    return 'No files found';
  };

  return {
    fileSystem,
    navigateDirectory,
    listDirectory
  };
};
