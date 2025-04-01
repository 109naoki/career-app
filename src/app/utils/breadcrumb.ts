import { BreadcrumbItem } from "../components/ui/Breadcrumb";


export const BREADCRUMB_MAPPING: Record<string, BreadcrumbItem[]> = {


  "/carrer": [
    {
      label: "転職サービス一覧",
      href: "/carrer",
      isCurrent: false
    },

  ],
  "/carrer/[id]": [
    {
      label: "転職サービス一覧",
      href: "/carrer",
      isCurrent: false
    },
    {
      label: "サービス詳細",
      href: "/carrer/[id]",
      isCurrent: true
    }
  ],

  "/blog": [
    {
      label: "ブログ一覧",
      href: "/blog",
      isCurrent: false
    },
  ],
  "/blog/[id]": [
    {
      label: "ブログ一覧",
      href: "/blog",
      isCurrent: false
    },
    {
      label: "詳細",
      href: "/blog/[id]",
      isCurrent: true
    }
  ],
  "/category/[id]": [

    {
      label: "カテゴリ別",
      href: "/category/[id]",
      isCurrent: true
    }
  ],
  "/privacy_policy": [
    {
      label: "プライバシーポリシー",
      href: "/privacy_policy",
      isCurrent: true
    }
  ]
};

/**
 * 現在のパスに基づいてカスタムパンくずリストを取得する
 * @param path 現在のパス
 * @param dynamicParams 動的パラメータ（例: [id]を実際の値に置き換えるため）
 */
export function getCustomBreadcrumb(
  path: string,
  dynamicParams?: Record<string, string>
): BreadcrumbItem[] | undefined {
  // パスが直接マッピングに存在するか確認
  if (BREADCRUMB_MAPPING[path]) {
    return BREADCRUMB_MAPPING[path];
  }
  
  // パスの動的部分を[id]などに置き換えて確認
  const pathSegments = path.split("/");
  const potentialDynamicPaths = Object.keys(BREADCRUMB_MAPPING).map(mappingPath => ({
    mappingPath,
    segments: mappingPath.split("/")
  }));
  
  for (const { mappingPath, segments } of potentialDynamicPaths) {
    if (segments.length !== pathSegments.length) continue;
    
    let isMatch = true;
    const params: Record<string, string> = {};
    
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      if (segment.startsWith("[") && segment.endsWith("]")) {
        // 動的パラメータの場合
        const paramName = segment.slice(1, -1);
        params[paramName] = pathSegments[i];
      } else if (segment !== pathSegments[i]) {
        // 静的セグメントが一致しない
        isMatch = false;
        break;
      }
    }
    
    if (isMatch) {
      // マッピングが見つかった場合、動的パラメータを置き換える
      let items = [...BREADCRUMB_MAPPING[mappingPath]];
      
      if (dynamicParams) {
        // 動的タイトルなどを置き換える
        items = items.map(item => {
          const newItem = { ...item };
          
          // hrefの[id]などを実際の値に置き換え
          if (newItem.href.includes("[")) {
            Object.entries(params).forEach(([key, value]) => {
              newItem.href = newItem.href.replace(`[${key}]`, value);
            });
          }
          
          return newItem;
        });
      }
      
      return items;
    }
  }
  
  return undefined;
} 