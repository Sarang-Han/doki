'use client'

import React, { useState } from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Twitter, Instagram, PlusCircle, Search, Settings, ChevronDown, ChevronRight, BookmarkPlus, Share2, Bell, ExternalLink, CalendarIcon, Home, BookOpen, Filter } from 'lucide-react'
import { format } from "date-fns"
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { ErrorBoundary } from 'react-error-boundary'

// 샘플 데이터
const connectedAccounts = [
  { id: 1, name: 'Twitter', icon: Twitter },
  { id: 2, name: 'Instagram', icon: Instagram },
]

const interests = [
  {
    id: 1,
    name: '테니스',
    icon: '🎾',
    subscriptions: [
      { id: 101, name: 'Rafael Nadal', platform: 'Twitter' },
      { id: 102, name: 'Serena Williams', platform: 'Instagram' },
      { id: 103, name: 'Novak Djokovic', platform: 'Twitter' },
    ]
  },
  {
    id: 2,
    name: '요리',
    icon: '👨‍🍳',
    subscriptions: [
      { id: 201, name: 'Gordon Ramsay', platform: 'Twitter' },
      { id: 202, name: 'Jamie Oliver', platform: 'Instagram' },
      { id: 203, name: 'Maangchi', platform: 'YouTube' },
    ]
  },
  {
    id: 3,
    name: '여행',
    icon: '✈️',
    subscriptions: [
      { id: 301, name: 'Lonely Planet', platform: 'Twitter' },
      { id: 302, name: 'National Geographic', platform: 'Instagram' },
      { id: 303, name: 'Rick Steves', platform: 'YouTube' },
    ]
  },
]

// 검색어 추천 데이터
const searchSuggestions = [
  "라파엘 나달", "세레나 윌리엄스", "노박 조코비치", "로저 페더러",
  "파스타 레시피", "한식 만들기", "여행 꿀팁", "테니스 기술"
]

// 샘플 검색 결과 데이터
const sampleSearchResults = [
  {
    id: 1,
    author: 'Rafael Nadal',
    avatar: '/placeholder.svg?height=40&width=40',
    platform: 'Twitter',
    content: '오늘 훈련은 정말 힘들었지만 보람찼습니다. 다음 경기를 위해 계속 노력하겠습니다! #NeverGiveUp',
    likes: 15200,
    replies: 3040,
    image: null,
  },
  {
    id: 2,
    author: 'Gordon Ramsay',
    avatar: '/placeholder.svg?height=40&width=40',
    platform: 'Instagram',
    content: '오늘의 레시피: 완벽한 스테이크를 굽는 방법. 여러분도 집에서 쉽게 따라 할 수 있습니다!',
    likes: 9820,
    replies: 1570,
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: 3,
    author: 'Lonely Planet',
    avatar: '/placeholder.svg?height=40&width=40',
    platform: 'Twitter',
    content: '2023년 꼭 가봐야 할 여행지 TOP 10을 발표했습니다. 여러분의 버킷리스트에 추가하세요!',
    likes: 7310,
    replies: 890,
    image: null,
  },
]

export function Doki() {
  const [openInterests, setOpenInterests] = useState<number[]>([])
  //const [searchQuery, setSearchQuery] = useState("")
  //const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
  //  from: undefined,
  //  to: undefined,
  //})
  //const [contentFilter, setContentFilter] = useState("all")
  //const [sortOrder, setSortOrder] = useState("recent")
  //const [searchResults, setSearchResults] = useState(sampleSearchResults)
  //const [engagementLevel, setEngagementLevel] = useState("any")
  //const [postType, setPostType] = useState("all")
  //const [language, setLanguage] = useState("all")
  //const [includeReplies, setIncludeReplies] = useState(false)

  const toggleInterest = (id: number) => {
    setOpenInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  //const handleSearch = () => {
  //  console.log("Searching with:", { searchQuery, dateRange, contentFilter, sortOrder, engagementLevel, postType, language, includeReplies })
  //  setSearchResults(sampleSearchResults)
  //}

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <div className="flex h-screen bg-background">
        {/* 왼쪽 사이드바 */}
        <aside className="w-80 border-r flex flex-col">
          <div className="p-6 border-b text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="이화연" />
              <AvatarFallback>이화연</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">이화연</h2>
            <p className="text-sm text-muted-foreground mb-2">@hwayeon</p>
            <p className="text-sm">테니스를 사랑하는 사람</p>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div>
                <h2 className="text-sm font-semibold mb-2">피드</h2>
                {interests.map((interest) => (
                  <Collapsible
                    key={interest.id}
                    open={openInterests.includes(interest.id)}
                    onOpenChange={() => toggleInterest(interest.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" className="w-full justify-start mb-1">
                        <span className="mr-2">{interest.icon}</span>
                        {interest.name}
                        <ChevronRight className={`ml-auto h-4 w-4 transition-transform ${openInterests.includes(interest.id) ? 'rotate-90' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {interest.subscriptions.map((sub) => (
                        <Button key={sub.id} variant="ghost" className="w-full justify-start mb-1 pl-8">
                          {sub.name}
                          <span className="ml-auto text-xs text-muted-foreground">{sub.platform}</span>
                        </Button>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
                <Button variant="outline" className="w-full justify-start mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  그룹 추가
                </Button>
              </div>

              <Separator />

              <div>
                <h2 className="text-sm font-semibold mb-2">발견</h2>
                <div className="space-y-2">
                <Link href="/tennis-discovery">
                <Button variant="ghost" className="w-full justify-start">
                  <span className="mr-2">🎾</span>
                  테니스
                </Button>
                </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    주제 추가
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h2 className="text-sm font-semibold mb-2">연동된 계정</h2>
                {connectedAccounts.map((account) => (
                  <Button key={account.id} variant="ghost" className="w-full justify-start mb-1">
                    <account.icon className="mr-2 h-4 w-4" />
                    {account.name}
                  </Button>
                ))}
                <Button variant="outline" className="w-full justify-start mt-2">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  계정 연동
                </Button>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* 오른쪽 메인 컨텐츠 */}
        <main className="flex-1 overflow-hidden flex flex-col">
          <header className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-4">
          <Link href="/">
            <img src="https://i.imgur.com/ybqGyvO.png" alt="Doki Logo" className="h-9 w-17 cursor-pointer" />
          </Link>
         </div>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Home className="h-5 w-5 mr-2" />
                홈
              </Button>
              <Button variant="ghost" size="sm">
                <Search className="h-5 w-5 mr-2" />
                검색
              </Button>
              <Button variant="ghost" size="sm">
                <BookOpen className="h-5 w-5 mr-2" />
                북마크
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5 mr-2" />
                설정
              </Button>
            </nav>
          </header>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">나의 구독 목록</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    필터
                  </Button>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    새 그룹 추가
                  </Button>
                </div>
              </div>
              {[
                { name: '테니스', accounts: [
                  { name: 'Rafael Nadal', handle: '@RafaelNadal', image: '/placeholder.svg?height=40&width=40', newPosts: 3 },
                  { name: 'Serena Williams', handle: '@serenawilliams', image: '/placeholder.svg?height=40&width=40', newPosts: 1 },
                  { name: 'Novak Djokovic', handle: '@DjokerNole', image: '/placeholder.svg?height=40&width=40', newPosts: 5 },
                  { name: 'ATP Tour', handle: '@atptour', image: '/placeholder.svg?height=40&width=40', newPosts: 10 },
                  { name: 'WTA', handle: '@WTA', image: '/placeholder.svg?height=40&width=40', newPosts: 7 },
                  { name: 'Tennis TV', handle: '@TennisTV', image: '/placeholder.svg?height=40&width=40', newPosts: 2 },
                ]},
                { name: '요리', accounts: [
                  { name: 'Gordon Ramsay', handle: '@GordonRamsay', image: '/placeholder.svg?height=40&width=40', newPosts: 4 },
                  { name: 'Jamie Oliver', handle: '@jamieoliver', image: '/placeholder.svg?height=40&width=40', newPosts: 2 },
                  { name: 'Maangchi', handle: '@maangchi', image: '/placeholder.svg?height=40&width=40', newPosts: 1 },
                ]},
                { name: '여행', accounts: [
                  { name: 'Lonely Planet', handle: '@lonelyplanet', image: '/placeholder.svg?height=40&width=40', newPosts: 8 },
                  { name: 'National Geographic', handle: '@NatGeo', image: '/placeholder.svg?height=40&width=40', newPosts: 6 },
                  { name: 'Rick Steves', handle: '@RickSteves', image: '/placeholder.svg?height=40&width=40', newPosts: 3 },
                ]},
              ].map((group, index) => (
                <Card key={`group-${index}`} className="mb-6">
                  <CardContent className="p-4 bg-background">
                    <h3 className="text-xl font-semibold mb-4">{group.name}</h3>
                    <div className="space-y-2">
                      {group.accounts.map((account) => (
                        <Dialog key={account.handle}>
                          <DialogTrigger asChild>
                            <div className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-accent transition-colors duration-200">
                              <div className="flex items-center space-x-3">
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={account.image} alt={account.name} />
                                  <AvatarFallback>{account.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{account.name}</p>
                                  <p className="text-sm text-muted-foreground">{account.handle}</p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-xs text-muted-foreground mb-1">오전 12:30</span>
                                {account.newPosts > 0 && (
                                  <Badge variant="destructive" className="rounded-full px-2">
                                    {account.newPosts}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{account.name}</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                              <p>Recent posts from {account.name} will be displayed here.</p>
                              {/* Add content for recent posts here */}
                            </div>
                          </DialogContent>
                        </Dialog>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </main>
      </div>
    </ErrorBoundary>
  )
}