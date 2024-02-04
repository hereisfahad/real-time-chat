import React from 'react'
import { Avatar as ShadcnAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getNameInitials } from '@/lib/utils';

function Avatar({ src, name }: { src: string, name: string }) {
    return (
        <ShadcnAvatar>
            <AvatarImage src={src} />
            <AvatarFallback>{getNameInitials(name)}</AvatarFallback>
        </ShadcnAvatar >
    )
}

export default Avatar
