'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Twitter, Instagram, Mail } from 'lucide-react'

export default function Onboarding() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      {/* 로고 */}
      <div className="mb-4">
        <img 
          src="https://i.imgur.com/ybqGyvO.png" 
          alt="Doki Logo" 
          className="h-14 w-auto cursor-pointer" 
        />
      </div>

      {/* 슬로건 및 설명 */}
      <div className="text-center mb-15">
        <h1 className="text-2xl font-semibold mb-4">
          구독의 두근거림, Doki와 함께.
        </h1>
        <p className="text-muted-foreground text-sm mb-20">
          효율적으로 구독을 관리하고,<br />
          취향에 맞는 콘텐츠를 손쉽게 발견하세요.
        </p>
      </div>

      {/* 로그인 버튼들 */}
      <div className="w-full max-w-sm space-y-4 px-4 mt-10">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={() => console.log('이메일 로그인')}
        >
          <Mail className="h-5 w-5" />
          이메일로 계속하기
        </Button>

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 bg-black text-white hover:bg-gray-800"
          onClick={() => console.log('X 로그인')}
        >
          <Twitter className="h-5 w-5" />
          X로 계속하기
        </Button>

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white hover:bg-pink-700"
          onClick={() => console.log('인스타그램 로그인')}
        >
          <Instagram className="h-5 w-5" />
          Instagram으로 계속하기
        </Button>
      </div>
    </div>
  )
}