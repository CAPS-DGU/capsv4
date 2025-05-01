package kr.dgucaps.capsv4.domain.wiki.util;

public class WikiUtils {
    private static final char[] CHO = {
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
            'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
            'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    public static String extractInitials(String word) {
        StringBuilder initials = new StringBuilder();
        for (char c : word.toCharArray()) {
            if (c >= 0xAC00 && c <= 0xD7A3) {
                int unicode = c - 0xAC00;
                int choIndex = unicode / (21 * 28);
                initials.append(CHO[choIndex]);
            } else {
                initials.append(c);
            }
        }
        return initials.toString();
    }

    public static boolean matchesInitial(String keyword, String target) {
        String initials = extractInitials(target);
        return initials.startsWith(keyword) || target.toLowerCase().contains(keyword.toLowerCase());
    }
}