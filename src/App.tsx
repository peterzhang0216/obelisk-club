import { useState, useEffect } from 'react'
import './App.css'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Search, Github, ExternalLink, Bookmark, Newspaper } from 'lucide-react'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [phNews, setPhNews] = useState<Array<{
    id: number;
    title: string;
    description: string;
    url: string;
    author: string;
    publishDate: string;
  }>>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const openSourceTools = [
    {
      id: 1,
      name: 'VS Code',
      description: '微软开源的代码编辑器，支持多种编程语言和扩展',
      url: 'https://github.com/microsoft/vscode',
      stars: '150K+'
    },
    {
      id: 2,
      name: 'React',
      description: 'Facebook开源的JavaScript库，用于构建用户界面',
      url: 'https://github.com/facebook/react',
      stars: '200K+'
    },
    {
      id: 3,
      name: 'TensorFlow',
      description: 'Google开源的机器学习框架',
      url: 'https://github.com/tensorflow/tensorflow',
      stars: '170K+'
    },
    {
      id: 4,
      name: 'Node.js',
      description: '基于Chrome V8引擎的JavaScript运行环境',
      url: 'https://github.com/nodejs/node',
      stars: '90K+'
    },
    {
      id: 5,
      name: 'Vue.js',
      description: '渐进式JavaScript框架，用于构建用户界面',
      url: 'https://github.com/vuejs/vue',
      stars: '200K+'
    },
    {
      id: 6,
      name: 'Next.js',
      description: 'React框架，用于生产环境的服务端渲染应用',
      url: 'https://github.com/vercel/next.js',
      stars: '100K+'
    },
    {
      id: 7,
      name: 'Kubernetes',
      description: '容器编排系统，用于自动化应用部署、扩展和管理',
      url: 'https://github.com/kubernetes/kubernetes',
      stars: '95K+'
    },
    {
      id: 8,
      name: 'Docker',
      description: '开源的应用容器引擎，让开发者可以打包他们的应用',
      url: 'https://github.com/docker/docker-ce',
      stars: '65K+'
    },
    {
      id: 9,
      name: 'Rust',
      description: '高性能、内存安全的系统编程语言',
      url: 'https://github.com/rust-lang/rust',
      stars: '80K+'
    },
    {
      id: 10,
      name: 'Go',
      description: 'Google开发的开源编程语言，简单高效',
      url: 'https://github.com/golang/go',
      stars: '110K+'
    },
    {
      id: 11,
      name: 'TypeScript',
      description: '微软开发的JavaScript超集，添加了类型系统',
      url: 'https://github.com/microsoft/TypeScript',
      stars: '85K+'
    },
    {
      id: 12,
      name: 'Svelte',
      description: '创新的前端框架，无虚拟DOM，编译时优化',
      url: 'https://github.com/sveltejs/svelte',
      stars: '70K+'
    },
    {
      id: 13,
      name: 'Deno',
      description: 'Node.js创始人开发的安全的JavaScript和TypeScript运行时',
      url: 'https://github.com/denoland/deno',
      stars: '85K+'
    },
    {
      id: 14,
      name: 'Flutter',
      description: 'Google的UI工具包，用于构建跨平台应用',
      url: 'https://github.com/flutter/flutter',
      stars: '150K+'
    },
    {
      id: 15,
      name: 'PyTorch',
      description: 'Facebook开发的开源机器学习库',
      url: 'https://github.com/pytorch/pytorch',
      stars: '65K+'
    },
    {
      id: 16,
      name: 'Tauri',
      description: '构建更小、更快、更安全的桌面应用程序的框架',
      url: 'https://github.com/tauri-apps/tauri',
      stars: '65K+'
    }
  ]

  const aiProjects = [
    {
      id: 1,
      name: 'ChatGPT',
      description: 'OpenAI开发的对话式AI助手',
      url: 'https://www.producthunt.com/products/chatgpt',
      upvotes: '10K+'
    },
    {
      id: 2,
      name: 'Midjourney',
      description: 'AI图像生成工具，可根据文本描述创建艺术图像',
      url: 'https://www.producthunt.com/products/midjourney',
      upvotes: '8K+'
    },
    {
      id: 3,
      name: 'Notion AI',
      description: '集成在Notion中的AI写作助手',
      url: 'https://www.producthunt.com/products/notion-ai',
      upvotes: '7K+'
    },
    {
      id: 4,
      name: 'Runway',
      description: 'AI视频编辑和生成工具',
      url: 'https://www.producthunt.com/products/runway-2',
      upvotes: '6K+'
    },
    {
      id: 5,
      name: 'Anthropic Claude',
      description: '专注于安全和有益对话的AI助手',
      url: 'https://www.producthunt.com/products/claude',
      upvotes: '5K+'
    },
    {
      id: 6,
      name: 'Stable Diffusion',
      description: '开源的AI图像生成模型',
      url: 'https://www.producthunt.com/products/stable-diffusion',
      upvotes: '9K+'
    },
    {
      id: 7,
      name: 'Perplexity AI',
      description: 'AI搜索引擎，提供准确的答案和引用来源',
      url: 'https://www.producthunt.com/products/perplexity-ai',
      upvotes: '7K+'
    },
    {
      id: 8,
      name: 'Synthesia',
      description: 'AI视频生成平台，可从文本创建逼真的视频',
      url: 'https://www.producthunt.com/products/synthesia',
      upvotes: '5K+'
    },
    {
      id: 9,
      name: 'Jasper',
      description: 'AI内容创作平台，帮助营销团队创建高质量内容',
      url: 'https://www.producthunt.com/products/jasper',
      upvotes: '6K+'
    },
    {
      id: 10,
      name: 'Otter.ai',
      description: 'AI会议记录和转录工具，实时记录和总结会议内容',
      url: 'https://www.producthunt.com/products/otter-ai',
      upvotes: '5K+'
    },
    {
      id: 11,
      name: 'Replika',
      description: 'AI伴侣应用，提供情感支持和对话',
      url: 'https://www.producthunt.com/products/replika',
      upvotes: '4K+'
    },
    {
      id: 12,
      name: 'Lensa AI',
      description: 'AI照片编辑应用，可创建艺术化头像',
      url: 'https://www.producthunt.com/products/lensa-ai',
      upvotes: '8K+'
    },
    {
      id: 13,
      name: 'Devin',
      description: '世界上第一个完全自主的AI软件工程师',
      url: 'https://www.producthunt.com/products/devin',
      upvotes: '7K+'
    },
    {
      id: 14,
      name: 'Gamma',
      description: 'AI驱动的演示文稿创建工具',
      url: 'https://www.producthunt.com/products/gamma-892a0974-d42e-4232-9488-d187f411c995',
      upvotes: '5K+'
    },
    {
      id: 15,
      name: 'Eleven Labs',
      description: 'AI语音合成平台，创建逼真的人工语音',
      url: 'https://www.producthunt.com/products/elevenlabs',
      upvotes: '6K+'
    },
    {
      id: 16,
      name: 'Sora',
      description: 'OpenAI的文本生成视频AI模型',
      url: 'https://www.producthunt.com/products/sora-by-openai',
      upvotes: '9K+'
    }
  ]

  const filteredOpenSourceTools = openSourceTools.filter(tool => 
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredAiProjects = aiProjects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPhNews = phNews.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    news.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    const fetchPhNews = async () => {
      setLoading(true)
      try {
        const mockNewsItems = [
          {
            id: 1,
            title: "Devin AI - 首个AI软件工程师",
            description: "Devin是世界上第一个完全自主的AI软件工程师，能够独立完成复杂的编程任务。",
            url: "https://www.producthunt.com/posts/devin-ai",
            author: "Cognition Labs",
            publishDate: "2025-03-20"
          },
          {
            id: 2,
            title: "Claude 3 - 最新一代AI助手",
            description: "Anthropic推出的Claude 3系列模型，包括Opus、Sonnet和Haiku三个版本，提供更强大的理解能力。",
            url: "https://www.producthunt.com/posts/claude-3",
            author: "Anthropic",
            publishDate: "2025-03-15"
          },
          {
            id: 3,
            title: "Midjourney V6 - 革命性图像生成",
            description: "Midjourney最新版本带来更逼真的图像生成能力，支持更复杂的提示词和风格控制。",
            url: "https://www.producthunt.com/posts/midjourney-v6",
            author: "Midjourney",
            publishDate: "2025-03-10"
          },
          {
            id: 4,
            title: "Sora - OpenAI的文本生成视频模型",
            description: "OpenAI推出的Sora能够根据文本描述生成高质量、逼真的视频内容。",
            url: "https://www.producthunt.com/posts/sora-by-openai",
            author: "OpenAI",
            publishDate: "2025-03-05"
          },
          {
            id: 5,
            title: "GPT-5 - 下一代大型语言模型",
            description: "OpenAI的GPT-5模型带来更强大的推理能力和更广泛的知识库。",
            url: "https://www.producthunt.com/posts/gpt-5",
            author: "OpenAI",
            publishDate: "2025-02-28"
          },
          {
            id: 6,
            title: "Perplexity AI - 知识搜索引擎",
            description: "Perplexity AI结合了搜索引擎和大型语言模型的能力，提供更精确的信息检索体验。",
            url: "https://www.producthunt.com/posts/perplexity-ai-2",
            author: "Perplexity",
            publishDate: "2025-02-25"
          },
          {
            id: 7,
            title: "Runway Gen-3 - 创意视频生成",
            description: "Runway的最新一代AI视频生成工具，支持更长时间、更高质量的视频创作。",
            url: "https://www.producthunt.com/posts/runway-gen-3",
            author: "Runway",
            publishDate: "2025-02-20"
          },
          {
            id: 8,
            title: "Gemini Pro - Google的多模态AI",
            description: "Google的Gemini Pro模型支持文本、图像、音频和视频的多模态理解和生成。",
            url: "https://www.producthunt.com/posts/gemini-pro",
            author: "Google",
            publishDate: "2025-02-15"
          },
          {
            id: 9,
            title: "Notion AI - 智能写作助手",
            description: "Notion集成的AI助手，帮助用户更高效地创建和编辑内容。",
            url: "https://www.producthunt.com/posts/notion-ai-2",
            author: "Notion",
            publishDate: "2025-02-10"
          },
          {
            id: 10,
            title: "Figma AI - 设计智能助手",
            description: "Figma推出的AI设计助手，能够根据文本描述生成UI组件和完整设计。",
            url: "https://www.producthunt.com/posts/figma-ai",
            author: "Figma",
            publishDate: "2025-02-05"
          },
          {
            id: 11,
            title: "Stable Diffusion 3 - 开源图像生成",
            description: "Stability AI推出的最新一代开源图像生成模型，提供更高质量的图像输出。",
            url: "https://www.producthunt.com/posts/stable-diffusion-3",
            author: "Stability AI",
            publishDate: "2025-01-30"
          },
          {
            id: 12,
            title: "Whisper V3 - 高精度语音识别",
            description: "OpenAI的Whisper V3提供更准确的多语言语音识别和转录能力。",
            url: "https://www.producthunt.com/posts/whisper-v3",
            author: "OpenAI",
            publishDate: "2025-01-25"
          },
          {
            id: 13,
            title: "Copilot Pro - 高级AI编程助手",
            description: "GitHub和OpenAI合作推出的高级编程助手，支持更多编程语言和更复杂的代码生成。",
            url: "https://www.producthunt.com/posts/github-copilot-pro",
            author: "GitHub",
            publishDate: "2025-01-20"
          },
          {
            id: 14,
            title: "Luma AI - 3D内容生成",
            description: "Luma AI能够从2D图像生成高质量的3D模型和场景。",
            url: "https://www.producthunt.com/posts/luma-ai-2",
            author: "Luma AI",
            publishDate: "2025-01-15"
          },
          {
            id: 15,
            title: "Eleven Labs V3 - 逼真语音合成",
            description: "Eleven Labs的最新语音合成技术，提供更自然、更情感化的AI语音。",
            url: "https://www.producthunt.com/posts/eleven-labs-v3",
            author: "Eleven Labs",
            publishDate: "2025-01-10"
          },
          {
            id: 16,
            title: "Hugging Face Pro - AI模型开发平台",
            description: "Hugging Face推出的专业版平台，为AI开发者提供更强大的模型训练和部署工具。",
            url: "https://www.producthunt.com/posts/hugging-face-pro",
            author: "Hugging Face",
            publishDate: "2025-01-05"
          }
        ];
        
        setPhNews(mockNewsItems);
        setError(''); // 清除任何之前的错误
      } catch (err) {
        console.error('获取Product Hunt新闻失败:', err)
        setError('无法加载Product Hunt新闻，请稍后再试')
      } finally {
        setLoading(false)
      }
    }
    
    fetchPhNews()
  }, [])// 只在组件挂载时运行一次

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">方尖碑俱乐部</h1>
              <p className="text-gray-600">Obelisk Club</p>
            </div>
            <div className="relative w-64">
              <Input
                type="text"
                placeholder="搜索项目..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="opensource" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="opensource">开源工具</TabsTrigger>
            <TabsTrigger value="ai">AI 项目</TabsTrigger>
            <TabsTrigger value="phnews">PH 每日新闻</TabsTrigger>
          </TabsList>
          
          {/* Open Source Tools Tab */}
          <TabsContent value="opensource" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpenSourceTools.map(tool => (
                <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{tool.name}</span>
                      <span className="text-sm font-normal text-gray-500 flex items-center">
                        <Github className="h-4 w-4 mr-1" />
                        {tool.stars}
                      </span>
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        访问 <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredOpenSourceTools.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">没有找到匹配的开源工具</p>
              </div>
            )}
          </TabsContent>
          
          {/* AI Projects Tab */}
          <TabsContent value="ai" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAiProjects.map(project => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{project.name}</span>
                      <span className="text-sm font-normal text-gray-500 flex items-center">
                        <Bookmark className="h-4 w-4 mr-1" />
                        {project.upvotes}
                      </span>
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        访问 <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredAiProjects.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">没有找到匹配的AI项目</p>
              </div>
            )}
          </TabsContent>
          
          {/* Product Hunt News Tab */}
          <TabsContent value="phnews" className="space-y-4">
            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">加载中...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhNews.map(news => (
                  <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>{news.title}</span>
                        <span className="text-sm font-normal text-gray-500 flex items-center">
                          <Newspaper className="h-4 w-4 mr-1" />
                          {news.publishDate}
                        </span>
                      </CardTitle>
                      <CardDescription>{news.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-2 flex justify-between">
                      <span className="text-xs text-gray-500">作者: {news.author}</span>
                      <Button variant="outline" size="sm" asChild>
                        <a href={news.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                          访问 <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
            {!loading && !error && filteredPhNews.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">没有找到匹配的PH新闻</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">© 2025 方尖碑俱乐部 (Obelisk Club) - 搜罗开源社区工具和AI项目</p>
        </div>
      </footer>
    </div>
  )
}

export default App
