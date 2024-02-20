interface FloatingMenuButtonProps {
  onAction: () => void;
  title: string;
  imgUrl: string;
  description: string;
}

export function FloatingMenuButton(props: FloatingMenuButtonProps) {
  const { onAction, title, description, imgUrl } = props;

  return (
    <button
      onClick={onAction}
      className="flex w-full items-center justify-start gap-2  bg-background p-2 text-left transition-colors duration-200 hover:bg-primary/20"
      type="button"
    >
      <img src={imgUrl} alt="text" className="h-12 w-12 rounded-md" />

      <div className="flex flex-col justify-start gap-1 text-[12px]">
        <span className="font-medium tracking-tighter text-foreground">
          {title}
        </span>

        <span className="text-muted-foreground">{description}</span>
      </div>
    </button>
  );
}
