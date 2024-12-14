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
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Twitter, Instagram, PlusCircle, Search, X, ChevronDown, ChevronRight, BookmarkPlus, Share2, Bell, ExternalLink, CalendarIcon } from 'lucide-react'
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


// 검색어 추천 데이터
const searchSuggestions = [
  "라파엘 나달", "ATP 투어", "테니스 라켓", "Babolat Pure Aero", 
  "그랜드슬램", "윔블던", "테니스 장비", "프로 테니스", 
  "테니스 코트", "테니스 레슨"
]

// 샘플 검색 결과 데이터
const sampleSearchResults = [
  {
    id: 1,
    author: 'Tennis Equipment Pro',
    avatar: '/pch.png',
    platform: 'Twitter',
    content: '라파엘 나달의 시그니처 라켓 Babolat Pure Aero의 새로운 모델이 출시되었습니다! 더욱 향상된 스핀 성능과 파워를 제공합니다.',
    likes: 1520,
    replies: 304,
    image: '/pch.png',
  },
  {
    id: 2,
    author: 'ATP Tour',
    avatar: '/pch.png',
    platform: 'Instagram',
    content: '라파엘 나달이 선호하는 테니스 장비를 소개합니다. Babolat Pure Aero 라켓으로 구사하는 강력한 탑스핀 포어핸드의 비밀! 🎾',
    likes: 2982,
    replies: 457,
    image: '/pch.png',
  },
  {
    id: 3,
    author: 'Tennis Magazine',
    avatar: '/pch.png',
    platform: 'Twitter',
    content: '프로 테니스 선수들의 라켓 선택 가이드: 나달의 Babolat Pure Aero부터 조코비치의 Head Speed Pro까지, 톱랭커들의 장비 분석 #테니스라켓 #프로테니스',
    likes: 831,
    replies: 129,
    image: null,
  },
]

export function SearchComponent() {
  const [openInterests, setOpenInterests] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [contentFilter, setContentFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState("recent")
  const [minLikes, setMinLikes] = useState(0)
  const [includeReplies, setIncludeReplies] = useState(false)
  const [searchResults, setSearchResults] = useState(sampleSearchResults)
  const [engagementLevel, setEngagementLevel] = useState("any")
  const [postType, setPostType] = useState("all")
  const [language, setLanguage] = useState("all")

  const toggleInterest = (id: number) => {
    setOpenInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const handleSearch = () => {
    // 실제 검색 로직을 여기에 구현합니다.
    console.log("Searching with:", { searchQuery, dateRange, contentFilter, sortOrder, engagementLevel, postType, language, includeReplies })
    // 여기서는 샘플 데이터를 사용합니다.
    setSearchResults(sampleSearchResults)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* 왼쪽 사이드바 */}
      <aside className="w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <Link href="/">
            <img src="https://i.imgur.com/ybqGyvO.png" alt="Doki Logo" className="h-9 w-17 mb-4 cursor-pointer" />
          </Link>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-20">
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((suggestion) => (
                <Badge
                  key={suggestion}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSearchQuery(suggestion)}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">기간 설정</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>날짜 선택</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">컨텐츠 필터</label>
              <Select value={contentFilter} onValueChange={setContentFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 컨텐츠</SelectItem>
                  <SelectItem value="text">텍스트만</SelectItem>
                  <SelectItem value="image">이미지 포함</SelectItem>
                  <SelectItem value="video">비디오 포함</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">정렬 순서</label>
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">최신순</SelectItem>
                  <SelectItem value="popular">인기순</SelectItem>
                  <SelectItem value="relevant">관련성순</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">게시물 유형</label>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 유형</SelectItem>
                  <SelectItem value="original">원본 게시물</SelectItem>
                  <SelectItem value="repost">리포스트/리트윗</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">언어</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">모든 언어</SelectItem>
                  <SelectItem value="ko">한국어</SelectItem>
                  <SelectItem value="en">영어</SelectItem>
                  <SelectItem value="ja">일본어</SelectItem>
                  <SelectItem value="zh">중국어</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="include-replies"
                checked={includeReplies}
                onCheckedChange={setIncludeReplies}
              />
              <label htmlFor="include-replies" className="text-sm font-medium">
                답글 포함
              </label>
            </div>

          </div>
        </ScrollArea>
      </aside>

      {/* 오른쪽 메인 컨텐츠 (검색 결과) */}
      <main className="flex-1 overflow-hidden flex flex-col">
        <header className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">검색 결과</h2>
          <Link href="/">
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
            </Button>
          </Link>
        </header>
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {searchResults.map((post) => (
              <div key={post.id} className="bg-card rounded-lg shadow-md p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.avatar} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-muted-foreground">{post.platform}</p>
                      </div>
                      {post.platform === 'Twitter' ? (
                        <Twitter className="h-5 w-5 text-sky-500" />
                      ) : (
                        <Instagram className="h-5 w-5 text-pink-500" />
                      )}
                    </div>
                    <p className="text-sm mb-2">{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post content" className="w-full h-48 object-cover rounded-lg mb-2" />
                    )}
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{post.likes} 좋아요</span>
                      <span>{post.replies} 답글</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <Button variant="ghost" size="sm">
                    <BookmarkPlus className="h-4 w-4 mr-1" />
                    저장
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-1" />
                    공유
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    원본 보기
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  )
}